'use server';

import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { buatToken, NAMA_COOKIE, UMUR_SESI } from '@/lib/sesi';

export type HasilMasuk = { pesan: string };

function sandiCocok(input: string, sandiAsli: string): boolean {
  const hashInput = createHash('sha256').update(input).digest();
  const hashAsli = createHash('sha256').update(sandiAsli).digest();

  return timingSafeEqual(hashInput, hashAsli);
}

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get('sandi') ?? '');
  const dari = String(formData.get('dari') ?? '');
  const sandiAsli = process.env.ADMIN_PASSWORD;

  if (!sandiAsli || !sandiCocok(sandi, sandiAsli)) {
    return { pesan: 'Kata sandi salah.' };
  }

  (await cookies()).set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: UMUR_SESI,
  });

  redirect(dari === '/admin' || dari.startsWith('/admin/') ? dari : '/admin');
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect('/login');
}
