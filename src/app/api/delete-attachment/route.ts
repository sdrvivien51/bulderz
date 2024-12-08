import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    // Vérification du Content-Type
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type invalide' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error(
        '[Delete] Auth error:',
        authError?.message || 'No user found'
      );
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { filePath } = await request.json();

    if (!filePath || !/^[0-9]+-[\w\-. ]+$/.test(filePath)) {
      return NextResponse.json(
        { success: false, error: 'Nom de fichier invalide' },
        { status: 400 }
      );
    }

    const { error: deleteError } = await supabase.storage
      .from('blog-attachments')
      .remove([filePath]);

    if (deleteError) {
      console.error('[Delete] Storage error:', deleteError);
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Delete] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}
