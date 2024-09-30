import { refreshSession } from '../../../lib/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
  return await handleRefreshToken(req);
}

export async function POST(req) {
  return await handleRefreshToken(req);
}

async function handleRefreshToken(req) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = await refreshSession(refreshToken);
    const accessExpiresAt = new Date(Date.now() + 50 * 60 * 1000);

    cookies().set('accessToken', token, {
      httpOnly: true,
      secure: true,
      expires: accessExpiresAt,
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.redirect(new URL('/menu', req.nextUrl));
  } catch (error) {
    console.error('Error refreshing token:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
