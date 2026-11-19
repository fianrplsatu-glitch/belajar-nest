import { NextResponse } from 'next/server';
import { ambilEvents } from '@/data/ambil';

export async function GET() {
  const events = await ambilEvents();
  return NextResponse.json(events);
}
