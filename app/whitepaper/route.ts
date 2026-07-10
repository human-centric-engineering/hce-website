import { NextResponse, type NextRequest } from 'next/server';

/**
 * GET /whitepaper — stable public URL for the HCE whitepaper.
 *
 * Redirects to the PDF served from public/downloads/ so the canonical link
 * (linked from the holding page's "Read the whitepaper" and shareable directly)
 * stays put even if the asset path changes later. The PDF is dropped into
 * public/downloads/hce-studio-whitepaper.pdf out of band.
 *
 * Static redirect target (no user input) → no injection surface. GET-only.
 */
export function GET(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/downloads/hce-studio-whitepaper.pdf', request.url));
}
