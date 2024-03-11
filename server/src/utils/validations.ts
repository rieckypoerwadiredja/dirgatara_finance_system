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
  oldPassword: string,
  newPassword: string
): string | null => {
  if (!oldPassword || !newPassword) {
    return "Both old password and new password are required";
  }

  if (oldPassword === newPassword) {
    return "New password must be different from old password";
  }

  if (newPassword.length < 8) {
    return "New password must be at least 8 characters long";
  }

  // Tambahkan validasi tambahan sesuai kebutuhan

  return null; // Kembalikan null jika validasi berhasil
};
