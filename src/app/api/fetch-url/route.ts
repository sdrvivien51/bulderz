import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ success: 0 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(
      /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i
    );
    const ogImageMatch = html.match(
      /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i
    );

    return NextResponse.json({
      success: 1,
      link: url,
      meta: {
        title: titleMatch ? titleMatch[1] : '',
        description: descriptionMatch ? descriptionMatch[1] : '',
        image: {
          url: ogImageMatch ? ogImageMatch[1] : ''
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: 0 });
  }
}
