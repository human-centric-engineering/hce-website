/**
 * GET /whitepaper — stable vanity URL that redirects to the whitepaper PDF.
 *
 * @see app/whitepaper/route.ts
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/whitepaper/route';

describe('GET /whitepaper', () => {
  it('redirects to the whitepaper PDF in public/downloads', () => {
    const res = GET(new NextRequest('http://localhost:3000/whitepaper'));

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe(
      'http://localhost:3000/downloads/hce-studio-whitepaper.pdf'
    );
  });

  it('resolves the PDF relative to the request origin', () => {
    const res = GET(new NextRequest('https://hce.studio/whitepaper'));

    expect(res.headers.get('location')).toBe(
      'https://hce.studio/downloads/hce-studio-whitepaper.pdf'
    );
  });
});
