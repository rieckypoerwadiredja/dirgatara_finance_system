export const BG_DEFAULT = {
  noRef: "",
  pekerjaan: "",
  program: "",
  kode_program: "",
  idr: 0,
  tgl_terbit: "",
  tgl_jatuh_tempo: "",
  persen: 0,
  biaya_idr: "",
  deposito_giro: "",
  jenis: "",
  norek: "",
  nominal_idr: "",
  tgl_pembukuan: "",
};

export const BG_UPDATE_DEFAULT = {
  id: "",
  noRef: "",
  pekerjaan: "",
  program: "",
  kode_program: "",
  idr: 0,
  tgl_terbit: "",
  tgl_jatuh_tempo: "",
  persen: "",
  biaya_idr: "",
  deposito_giro: "",
  jenis: "",
  norek: "",
  nominal_idr: "",
  tgl_pembukuan: "",
};

export const CREATE_USER_DEFAULT = {
  name: "",
  username: "",
  password: "",
  role: "",
};

export const UPDATE_USER_DEFAULT = {
  username: "",
  oldPassword: "",
  newPassword: "",
};

export const initialStatusProgram = {
  totalActive: { count: 0, status: "" },
  totalWarn60: { count: 0, status: "" },
  totalWarn30: { count: 0, status: "" },
  totalExpire: { count: 0, status: "" },
};
