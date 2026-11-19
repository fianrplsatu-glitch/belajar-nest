export type Pesanan = {
  nomor: number;
  event_id: number;
  nama: string;
  email: string;
  jumlah: number;
  total: number;
  dibuat: string;
  events: { judul: string } | null;
};

export type PesananLokal = {
  nomor: number;
  eventId: number;
  judul: string;
  nama: string;
  email: string;
  jumlah: number;
  total: number;
  waktu: string;
};

// Disimpan di memori server: hilang setiap kali server dimatikan.

export const pesanan: PesananLokal[] = [];

let nomorTerakhir = 0;

export function getDaftarPesanan() {
  return [...pesanan];
}

export function tambahPesanan(data: Omit<PesananLokal, 'nomor'>) {
  nomorTerakhir += 1;
  pesanan.unshift({ nomor: nomorTerakhir, ...data });
  return nomorTerakhir;
}
