export const POST_BG_FORM_FIELD = [
  { label: "Nomor Referensi", name: "noRef", type: "text" },
  { label: "Pekerjaan", name: "pekerjaan", type: "text" },
  {
    label: "Tipe",
    name: "tipe",
    type: "select",
    options: [
      "Jaminan Penawaran",
      "Jaminan Pelaksanaan",
      "Jaminan Uang Muka",
      "Jaminan Pemeliharaan",
    ],
    customOption: false,
  },
  { label: "Program", name: "program", type: "text" },
  { label: "Kode Program", name: "kode_program", type: "text" },
  { label: "Vauta Asli", name: "vauta_asli", type: "text" },
  {
    label: "Jenis Vauta Asli",
    name: "jenis_vauta_asli",
    type: "select",
    options: ["IDR", "USD", "EUR", "KRW", "MYR"],
    customOption: true,
  },
  { label: "Tanggal Terbit", name: "tgl_terbit", type: "date" },
  { label: "Tanggal Berlaku", name: "tgl_berlaku", type: "date" },
  { label: "Tanggal Jatuh Tempo", name: "tgl_jatuh_tempo", type: "date" },
  {
    label: "Bank",
    name: "bank",
    type: "select",
    options: ["BRI", "BNI", "EXM", "MDR"],
    customOption: true,
  },
  { label: "Deposito/Giro", name: "deposito_giro", type: "text" },
  {
    label: "Jenis",
    name: "jenis",
    type: "select",
    options: ["Provisi", "Margin Deposit"],
    customOption: false,
  },
  { label: "Nomor Rekening", name: "norek", type: "text" },
  { label: "Tanggal Pembukuan", name: "tgl_pembukuan", type: "date" },
];

export const UPDATE_BG_FORM_FIELD = [
  { label: "id", name: "id", type: "number" },
  { label: "Nomor Referensi", name: "noRef", type: "text" },
  { label: "Pekerjaan", name: "pekerjaan", type: "text" },
  {
    label: "Tipe",
    name: "tipe",
    type: "select",
    options: [
      "Jaminan Penawaran",
      "Jaminan Pelaksanaan",
      "Jaminan Uang Muka",
      "Jaminan Pemeliharaan",
    ],
    customOption: false,
  },
  { label: "Program", name: "program", type: "text" },
  { label: "Kode Program", name: "kode_program", type: "text" },
  { label: "Vauta Asli", name: "vauta_asli", type: "text" },
  {
    label: "Jenis Vauta Asli",
    name: "jenis_vauta_asli",
    type: "select",
    options: ["IDR", "USD", "EUR", "KRW", "MYR"],
    customOption: true,
  },
  { label: "Tanggal Terbit", name: "tgl_terbit", type: "date" },
  { label: "Tanggal Berlaku", name: "tgl_berlaku", type: "date" },
  { label: "Tanggal Jatuh Tempo", name: "tgl_jatuh_tempo", type: "date" },
  {
    label: "Bank",
    name: "bank",
    type: "select",
    options: ["BRI", "BNI", "EXM", "MDR"],
    customOption: true,
  },
  { label: "Deposito/Giro", name: "deposito_giro", type: "text" },
  {
    label: "Jenis",
    name: "jenis",
    type: "select",
    options: ["Provisi", "Margin Deposit"],
    customOption: false,
  },
  { label: "Nomor Rekening", name: "norek", type: "text" },
  { label: "Tanggal Pembukuan", name: "tgl_pembukuan", type: "date" },
];

export const POST_USER_FORM_FIELD = [
  { label: "Name", name: "name", type: "text" },
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" },
  {
    label: "Role",
    name: "role",
    type: "select",
    options: ["admin", "bri", "btn"],
    customOption: true,
  },
];

export const UPDATE_USER_FORM_FIELD = [
  {
    type: "text",
    label: "username",
    name: "username",
  },
  {
    type: "text",
    label: "Old Password",
    name: "oldPassword",
  },
  {
    type: "text",
    label: "New Password",
    name: "newPassword",
  },
];
