import { NextRequest, NextResponse } from 'next/server';

const TARGET_BASE_URL = 'https://cps.safarnameh24.com/api/v1';

async function proxyHandler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const search = req.nextUrl.search;

  // Always ensure trailing slash for Django API endpoints unless it is a file with extension
  const isFile = /\.[a-zA-Z0-9]+$/.test(path);
  const targetPath =
    isFile || !path ? path : path.endsWith('/') ? path : `${path}/`;
  const targetUrl = `${TARGET_BASE_URL}/${targetPath}${search}`;

  const requestHeaders = new Headers();
  req.headers.forEach((value, key) => {
    // Exclude host/connection headers
    if (
      key.toLowerCase() !== 'host' &&
      key.toLowerCase() !== 'connection' &&
      key.toLowerCase() !== 'content-length'
    ) {
      requestHeaders.set(key, value);
    }
  });

  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    try {
      const buffer = await req.arrayBuffer();
      if (buffer && buffer.byteLength > 0) {
        body = buffer;
      }
    } catch {
      body = undefined;
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      body,
      cache: 'no-store',
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (
        lower !== 'content-encoding' &&
        lower !== 'content-length' &&
        lower !== 'set-cookie'
      ) {
        responseHeaders.set(key, value);
      }
    });

    if (typeof (res.headers as any).getSetCookie === 'function') {
      const cookies = (res.headers as any).getSetCookie();
      for (const cookie of cookies) {
        responseHeaders.append('set-cookie', cookie);
      }
    }

    const responseData = await res.arrayBuffer();

    return new NextResponse(responseData, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    console.error('API Proxy Error:', err);
    return NextResponse.json(
      {
        error: 'Backend proxy error',
        details: err?.message || 'Network error',
      },
      { status: 502 },
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;
export const OPTIONS = proxyHandler;
export const HEAD = proxyHandler;
