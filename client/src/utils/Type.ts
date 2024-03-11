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
