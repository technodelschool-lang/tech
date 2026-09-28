import { NextResponse } from 'next/server';

// Forcibly override Vercel's stubborn dashboard and route to Washington DC!
export const preferredRegion = 'iad1';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });
  
  try {
    const res = await fetch(url, {
      // Force it to skip the Next.js fetch cache
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
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
