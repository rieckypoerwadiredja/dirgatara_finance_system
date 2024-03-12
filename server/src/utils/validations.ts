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

export function validateBankBriInput(
  noLC: string,
  noPo: string,
  suplier: string,
  program: string,
  nominal_RP: number,
  nominal_USD: number,
  nilai_akseptasi_RP: number,
  nilai_akseptasi_USD: number,
  tanggal_terbit: string,
  tanggal_expire: string,
  rating: string
): string | null {
  if (
    !noLC ||
    !noPo ||
    !suplier ||
    !program ||
    !tanggal_terbit ||
    !tanggal_expire ||
    !rating
  ) {
    return "Semua item harus terisi";
  }

  if (
    isNaN(nominal_RP) ||
    isNaN(nominal_USD) ||
    isNaN(nilai_akseptasi_RP) ||
    isNaN(nilai_akseptasi_USD)
  ) {
    return "Nominal harus berupa angka";
  }

  const tanggalTerbit = new Date(tanggal_terbit);
  const tanggalExpire = new Date(tanggal_expire);
  const today = new Date();

  if (tanggalTerbit <= today) {
    return "Tanggal terbit harus setelah hari ini";
  }

  if (tanggalExpire <= tanggalTerbit) {
    return "Tanggal kadaluarsa harus setelah tanggal terbit";
  }

  return null; // Tidak ada kesalahan validasi
}
