export function validateUserInput(
  name: string,
  username: string,
  role: string,
  password: string
): string | null {
  if (!name || !username || !role || !password) {
    return "Semua item harus terisi";
  }

  if (!["admin", "bri", "bni", "btn"].includes(role.toLowerCase())) {
    return "Role hanya boleh admin, bri, bni, atau btn";
  }

  if (
    password.length < 8 ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return "Password harus memiliki minimal 8 karakter dan mengandung huruf besar, kecil, dan angka";
  }

  return null; // Tidak ada kesalahan validasi
}
export const validateUserPassword = (
  username: string,
  oldPassword: string,
  newPassword: string
): string | null => {
  if (!username || !oldPassword || !newPassword) {
    return "Semua item harus terisi";
  }

  if (oldPassword === newPassword) {
    return "Password baru harus berbeda dengan password lama";
  }

  if (newPassword.length < 8) {
    return "Password baru harus berisi minimal 8 karakter";
  }

  // Tambahkan validasi tambahan sesuai kebutuhan

  return null; // Kembalikan null jika validasi berhasil
};
export function validateBankBGInput(
  noRef: number,
  pekerjaan: string,
  tipe: string,
  program: string,
  kode_program: string,
  vauta_asli: number,
  jenis_vauta_asli: string,
  tgl_terbit: string,
  tgl_berlaku: string,
  tgl_jatuh_tempo: string,
  bank: string,
  deposito_giro: number,
  jenis: string,
  norek: number,
  tgl_pembukuan: string
): string | null {
  if (
    !noRef ||
    !pekerjaan ||
    !tipe ||
    !program ||
    !kode_program ||
    !vauta_asli ||
    !jenis_vauta_asli ||
    !tgl_terbit ||
    !tgl_berlaku ||
    !tgl_jatuh_tempo ||
    !bank ||
    !deposito_giro ||
    !jenis ||
    !norek ||
    !tgl_pembukuan
  ) {
    return "Semua item harus terisi";
  }

  const allowedTipe = [
    "Jaminan Penawaran",
    "Jaminan Pelaksanaan",
    "Jaminan Uang Muka",
    "Jaminan Pemeliharaan",
  ];
  if (!allowedTipe.includes(tipe)) {
    return "Tipe harus salah satu dari: Jaminan Penawaran, Jaminan Pelaksanaan, Jaminan Uang Muka, Jaminan Pemeliharaan";
  }

  if (jenis_vauta_asli.length > 5) {
    return "Panjang karakter Nama Mata Uang tidak boleh lebih dari 5";
  }

  if (jenis_vauta_asli !== jenis_vauta_asli.toUpperCase()) {
    return "Nama Mata Uang harus menggunakan huruf besar semua";
  }
  const isValidDate = (dateString: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dateRegex) !== null;
  };

  if (
    !isValidDate(tgl_terbit) ||
    !isValidDate(tgl_berlaku) ||
    !isValidDate(tgl_jatuh_tempo)
  ) {
    return "Format tanggal tidak valid, gunakan format YYYY-MM-DD";
  }

  const terbitDate = new Date(tgl_terbit);
  const berlakuDate = new Date(tgl_berlaku);
  const jatuhTempoDate = new Date(tgl_jatuh_tempo);

  if (berlakuDate < terbitDate) {
    return "Tanggal berlaku harus setelah tanggal terbit";
  }

  if (jatuhTempoDate <= berlakuDate) {
    return "Tanggal jatuh tempo harus setelah tanggal berlaku";
  }

  if (bank.length > 5) {
    return "Panjang karakter Bank tidak boleh lebih dari 5";
  }

  if (bank !== bank.toUpperCase()) {
    return "Bank harus menggunakan huruf besar semua";
  }

  if (String(norek).length < 10 || String(norek).length > 16) {
    return "Nomor rekening harus terdiri dari 10-16 digit";
  }

  const allowedJenis = ["Provisi", "Margin Deposit"];
  if (!allowedJenis.includes(jenis)) {
    return "Jenis harus salah satu dari: Provisi, Margin Deposit";
  }

  return null; // Tidak ada kesalahan validasi
}
