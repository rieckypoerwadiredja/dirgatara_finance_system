interface Program {
  id: number;
  tgl_terbit: string;
  tgl_jatuh_tempo: string;
  bank: string;
}

export interface ProgramStatus {
  id: number;
  status: string;
}

interface TotalSummary {
  totalActive: number;
  totalWarn60: number;
  totalWarn30: number;
  totalExpire: number;
}

interface SuccessResult {
  programStatusArray: ProgramStatus[];
  totalSummary: TotalSummary;
}

interface ErrorResult {
  error: string;
}

export async function hitungStatusProgram({
  programs,
}: {
  programs: Program[];
}): Promise<SuccessResult | ErrorResult> {
  try {
    const todayDate = new Date();

    let totalActive = 0;
    let totalWarn60 = 0;
    let totalWarn30 = 0;
    let totalExpire = 0;

    const programStatusArray: ProgramStatus[] = programs.map((program) => {
      const tglTerbit = new Date(program.tgl_terbit);
      const tglJatuhTempo = new Date(program.tgl_jatuh_tempo);
      const diffTime = tglJatuhTempo.getTime() - todayDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

      let status = "";

      if (diffDays > 60) {
        status = "Active";
        totalActive++;
      } else if (diffDays >= 30 && diffDays <= 60) {
        status = "Warn 60 days left";
        totalWarn60++;
      } else if (diffDays < 30 && diffDays >= 0) {
        status = "Warn less than 60 days";
        totalWarn30++;
      } else {
        status = "Expire";
        totalExpire++;
      }

      return { id: program.id, status };
    });

    const totalSummary: TotalSummary = {
      totalActive,
      totalWarn60,
      totalWarn30,
      totalExpire,
    };

    return { programStatusArray, totalSummary };
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    return { error: "Error fetching GraphQL data" };
  }
}
// Contoh data programs yang digunakan untuk menghitung status
interface Program {
  id: number;
  jenis: string;
  vauta_asli: number;
  tgl_berlaku: string;
  tgl_jatuh_tempo: string;
  bank: string;
}

interface CalculatedValue {
  id: number;
  jenis: string;
  nilai: number;
}

export function hitungNilaiProgram(program: Program): CalculatedValue {
  let nilai: number;

  if (!program.vauta_asli) {
    console.error("Nilai BG tidak valid:", program.vauta_asli);
    return { id: program.id, jenis: program.jenis, nilai: 0 }; // Nilai default jika vauta_asli tidak valid
  }

  if (program.jenis === "Provisi") {
    // Hitung nilai berdasarkan jenis Provisi
    const nilaiBgString = program.vauta_asli; // Ko
    if (!nilaiBgString) {
      console.error("Nilai BG tidak valid:", program.vauta_asli);
      return { id: program.id, jenis: program.jenis, nilai: 0 }; // Nilai default jika vauta_asli tidak valid
    }

    const bankList = ["BRI", "BNI"];
    const rate = bankList.includes(program.bank) ? 0.05 : 0;
    const masaBerlaku = hitungMasaBerlaku(
      program.tgl_berlaku,
      program.tgl_jatuh_tempo
    );

    nilai = (rate * nilaiBgString * masaBerlaku) / 365;
  } else if (program.jenis === "Margin Deposit") {
    const nilaiBgString = program.vauta_asli.toString(); // Ko
    if (!nilaiBgString) {
      console.error("Nilai BG tidak valid:", program.vauta_asli);
      return { id: program.id, jenis: program.jenis, nilai: 0 }; // Nilai default jika vauta_asli tidak valid
    }
    // Hitung nilai berdasarkan jenis Margin Deposit
    const bankList = ["BRI", "BNI"];
    const rate = bankList.includes(program.bank) ? 0.05 : 0;
    nilai = rate * parseInt(nilaiBgString);
  } else {
    // Jenis program tidak dikenali, set nilai ke 0
    nilai = 0;
  }

  return { id: program.id, jenis: program.jenis, nilai };
}
export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};
function hitungMasaBerlaku(tglBerlaku: string, tglJatuhTempo: string): number {
  const berlakuDate = new Date(tglBerlaku);
  const jatuhTempoDate = new Date(tglJatuhTempo);
  const diffTime = jatuhTempoDate.getTime() - berlakuDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  return diffDays;
}
