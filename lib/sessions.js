'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createSession(accessToken, refreshToken) {
  const accessExpiresAt = new Date(Date.now() + 50 * 60 * 1000);
  // const accessExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
  const refreshExpiresAt = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);

  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function refreshSession(refreshToken) {
  'use server';
  const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;
  const payload = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  // Запис нового accessToken у куки

  return data.access_token;
}

export async function deleteSesssion() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/login');
}
