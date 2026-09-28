
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36'
      }
    });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'text/html' }
    });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}
