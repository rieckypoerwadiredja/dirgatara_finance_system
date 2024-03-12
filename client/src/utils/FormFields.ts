export const POST_BRI_FORM_FIELD = [
  { label: "LC Number", name: "noLC", type: "text" },
  { label: "PO Number", name: "noPo", type: "text" },
  { label: "Supplier", name: "suplier", type: "text" },
  { label: "Program", name: "program", type: "text" },
  { label: "Nominal (RP)", name: "nominal_RP", type: "number" },
  { label: "Nominal (USD)", name: "nominal_USD", type: "number" },
  {
    label: "Nilai Akseptasi (RP)",
    name: "nilai_akseptasi_RP",
    type: "number",
  },
  {
    label: "Nilai Akseptasi (USD)",
    name: "nilai_akseptasi_USD",
    type: "number",
  },
  { label: "Tanggal Terbit", name: "tanggal_terbit", type: "date" },
  { label: "Tanggal Expire", name: "tanggal_expire", type: "date" },
  { label: "Rating", name: "rating", type: "number" },
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
