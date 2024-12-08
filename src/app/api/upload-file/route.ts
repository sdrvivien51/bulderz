import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let file: File | null = null;
    let fileBuffer: ArrayBuffer;
    let fileName: string = '';
    let fileType: string = '';

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { session },
      error: authError
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      );
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'Aucun fichier fourni' },
          { status: 400 }
        );
      }
      fileName = file.name;
      fileType = file.type;
      fileBuffer = await file.arrayBuffer();
    } else if (contentType.includes('application/json')) {
      const { file: base64File, name, type } = await request.json();
      if (!base64File || !name) {
        return NextResponse.json(
          { success: false, error: 'Données manquantes' },
          { status: 400 }
        );
      }
      const base64Data = base64File.split(';base64,').pop();
      fileBuffer = Buffer.from(base64Data, 'base64');
      fileName = name;
      fileType = type;
    } else {
      return NextResponse.json(
        { success: false, error: 'Content-Type non supporté' },
        { status: 400 }
      );
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf'
    ];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { success: false, error: 'Type de fichier non supporté' },
        { status: 415 }
      );
    }

    if (fileBuffer.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: 'Le fichier est trop volumineux (maximum 5MB)'
        },
        { status: 413 }
      );
    }

    const timestamp = Date.now();
    const sanitizedFileName = `${timestamp}-${fileName.replace(
      /[^a-zA-Z0-9.-]/g,
      '_'
    )}`;

    const { data, error } = await supabase.storage
      .from('blog-attachments')
      .upload(sanitizedFileName, fileBuffer, {
        contentType: fileType,
        upsert: false,
        cacheControl: '3600'
      });

    if (error) {
      console.error('[Upload] Storage error:', error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'upload vers le stockage" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl }
    } = supabase.storage
      .from('blog-attachments')
      .getPublicUrl(sanitizedFileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: sanitizedFileName
    });
  } catch (error) {
    console.error('[Upload] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur inattendue' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
};
