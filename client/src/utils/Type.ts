// TODO Tipe data untuk formulir

export type BankBriType = {
  noLC: string;
  noPo: string;
  suplier: string;
  program: string;
  nominal_RP: number;
  nominal_USD: number;
  nilai_akseptasi_RP: number;
  nilai_akseptasi_USD: number;
  tanggal_terbit: string;
  tanggal_expire: string;
  rating: number;

  [key: string]: number | string;
};

export type UserType = {
  name: string;
  username: string;
  password: string;
  role: string;

  [key: string]: number | string;
};

export type UpdateUserType = {
  username: string;
  newPassword: string;
  oldPassword: string;

  [key: string]: number | string;
};

export type SelectType = {
  name: string;
  value: string;
  onChange: any;
  options: string[];
  customOption: boolean;
};

interface StatusDetail {
  count: number;
  status: string;
}

export interface TotalSummary {
  totalActive: StatusDetail;
  totalWarn60: StatusDetail;
  totalWarn30: StatusDetail;
  totalExpire: StatusDetail;
}

export interface Program {
  id: number;
  jenis: string;
  nilai_bg: number;
  tgl_berlaku: string;
  tgl_jatuh_tempo: string;
  bank?: string; // Tambahkan jika diperlukan untuk jenis program tertentu
}
