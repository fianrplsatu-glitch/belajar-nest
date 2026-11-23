'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import { pesanTiket, type HasilPesanan } from '@/app/actions';
import { rupiah, type Event } from '@/data/events';

export default function FormPesan({
  event,
  namaAwal = '',
}: {
  event: Event;
  namaAwal?: string;
}) {
  const awal: HasilPesanan = {
    berhasil: false,
    pesan: '',
    galat: {},
    isian: { nama: namaAwal, email: '' },
  };

  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);
  const [jumlah, setJumlah] = useState(1);
  const sisa = event.kuota - event.terisi;

  if (sisa <= 0) {
    return (
      <p className="mt-6 font-medium text-red-600">
        Tiket sudah habis.
      </p>
    );
  }

  function handleJumlahChange(e: ChangeEvent<HTMLInputElement>) {
    const nilai = e.target.valueAsNumber;

    if (!Number.isFinite(nilai)) {
      setJumlah(1);
      return;
    }

    setJumlah(Math.min(sisa, Math.max(1, Math.floor(nilai))));
  }

  return (
    <form action={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>

      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <input
          name="nama"
          defaultValue={hasil.isian.nama || namaAwal}
          placeholder="Nama pemesan"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.nama && (
          <p className="text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          defaultValue={hasil.isian.email}
          placeholder="Email"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.email && (
          <p className="text-sm text-red-600">{hasil.galat.email}</p>
        )}
      </div>

      <div>
        <input
          name="jumlah"
          type="number"
          min={1}
          max={sisa}
          step={1}
          value={jumlah}
          onChange={handleJumlahChange}
          className="block w-32 rounded border px-3 py-2"
        />
        {hasil.galat.jumlah && (
          <p className="text-sm text-red-600">
            {hasil.galat.jumlah}
          </p>
        )}
      </div>

      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p className={hasil.berhasil ? 'text-green-700' : 'text-red-600'}>
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? 'Memproses...' : 'Pesan'}
      </button>
    </form>
  );
}
