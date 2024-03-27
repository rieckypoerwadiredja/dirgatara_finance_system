import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_ALL_BG } from "../../../Graphql/Queries";
import CardDas from "../../fragments/CardDas";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgPerformance } from "react-icons/cg";
import {
  CardComponentTypeOne,
  CardComponentTypeTwo,
} from "../../../pages/Dashboard";
import {
  formatDate,
  hitungNilaiProgram,
  hitungStatusProgram,
} from "../../../utils/Calculation";
import { initialStatusProgram } from "../../../utils/DefaultVariables";
import { TotalSummary } from "../../../utils/Type";
import { TbCaptureFilled } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { Button, Typography } from "@material-tailwind/react";
import generatePDF from "react-to-pdf";
function GetAllBG() {
  const targetRef = useRef(null);

  const { data, loading, error, refetch } = useQuery(GET_ALL_BG);
  const [programJenisCount, setProgramJenisCount] = useState<{
    [key: string]: number;
  }>({
    Jaminan_Penawaran: 0,
    Jaminan_Pelaksanaan: 0,
    Jaminan_Uang_Muka: 0,
    Jaminan_Pemeliharaan: 0,
  });

  const [vautaAllJenisCount, setVautaAllJenisCount] = useState({
    BRI: 0,
    BNI: 0,
    EXM: 0,
    MDR: 0,
  });

  const [vautaAsliByBankAndType, setVautaAsliByBankAndType] = useState<any>({
    BRI: {
      "Jaminan Penawaran": 0,
      "Jaminan Pelaksanaan": 0,
      "Jaminan Uang Muka": 0,
      "Jaminan Pemeliharaan": 0,
    },
    BNI: {
      "Jaminan Penawaran": 0,
      "Jaminan Pelaksanaan": 0,
      "Jaminan Uang Muka": 0,
      "Jaminan Pemeliharaan": 0,
    },
    EXM: {
      "Jaminan Penawaran": 0,
      "Jaminan Pelaksanaan": 0,
      "Jaminan Uang Muka": 0,
      "Jaminan Pemeliharaan": 0,
    },
    MDR: {
      "Jaminan Penawaran": 0,
      "Jaminan Pelaksanaan": 0,
      "Jaminan Uang Muka": 0,
      "Jaminan Pemeliharaan": 0,
    },
  });

  const [statusProgram, setStatusProgram] =
    useState<TotalSummary>(initialStatusProgram);

  useEffect(() => {
    if (data) {
      hitungStatusProgram({ programs: data?.getAllBGs })
        .then((result) => {
          if ("programStatusArray" in result) {
            const { totalActive, totalWarn60, totalWarn30, totalExpire } =
              result.totalSummary;
            setStatusProgram({
              totalActive: {
                count: totalActive,
                status: "Active",
              },
              totalWarn60: {
                count: totalWarn60,
                status: "Warn 60 days left",
              },
              totalWarn30: {
                count: totalWarn30,
                status: "Warn less than 60 days",
              },
              totalExpire: {
                count: totalExpire,
                status: "Expire",
              },
            });
            console.log("Program Status Array:", result.programStatusArray);
            console.log("Total Summary:", result.totalSummary);
          } else {
            console.error("Error:", result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const updatedCounts = {
        Jaminan_Penawaran: 0,
        Jaminan_Pelaksanaan: 0,
        Jaminan_Uang_Muka: 0,
        Jaminan_Pemeliharaan: 0,
        Provisi: 0,
        Margin_Deposit: 0,
      };

      data?.getAllBGs.forEach((item: any) => {
        const tgl_berlaku = new Date(item.tgl_berlaku);
        const tgl_jatuh_tempo = new Date(item.tgl_jatuh_tempo);

        const satuHari = 24 * 60 * 60 * 1000; // Satu hari dalam milidetik
        const selisihMs = tgl_jatuh_tempo.getTime() - tgl_berlaku.getTime();
        const selisihHari = Math.floor(selisihMs / satuHari); // Mengonversi selisih dalam milidetik menjadi selisih dalam hari

        if (selisihHari > 60) {
          // Periksa selisih dalam hitungan hari
          if (item && item.tipe) {
            const jenis = item.tipe.toString();
            if (jenis === "Jaminan Penawaran") {
              updatedCounts.Jaminan_Penawaran++;
            } else if (jenis === "Jaminan Pelaksanaan") {
              updatedCounts.Jaminan_Pelaksanaan++;
            } else if (jenis === "Jaminan Uang Muka") {
              updatedCounts.Jaminan_Uang_Muka++;
            } else if (jenis === "Jaminan Pemeliharaan") {
              updatedCounts.Jaminan_Pemeliharaan++;
            }
          }
          if (item && item.jenis) {
            const jenis = item.jenis.toString();
            if (jenis === "Provisi") {
              updatedCounts.Provisi++;
            } else if (jenis === "Margin Deposit") {
              updatedCounts.Margin_Deposit++;
            }
          }
        }
      });
      setProgramJenisCount(updatedCounts);
    }
  }, [data?.getAllBGs]);

  useEffect(() => {
    if (data) {
      console.log(data);
      const vautaAsliByBank = { BRI: 0, BNI: 0, EXM: 0, MDR: 0 }; // Inisialisasi total vauta_asli per bank

      data.getAllBGs.forEach((data: any) => {
        const tgl_berlaku = formatDate(data.tgl_berlaku.toString());
        const tgl_jatuh_tempo = formatDate(data.tgl_jatuh_tempo.toString());

        const sixtyDaysInMs = 60 * 24 * 60 * 60 * 1000; // 60 hari dalam milidetik
        const selisihMs = tgl_jatuh_tempo.getTime() - tgl_berlaku.getTime();

        if (selisihMs > sixtyDaysInMs) {
          // Tambahkan nilai vauta_asli ke total per bank
          switch (data.bank) {
            case "BRI":
              vautaAsliByBank.BRI += parseInt(data.vauta_asli);
              break;
            case "BNI":
              vautaAsliByBank.BNI += parseInt(data.vauta_asli);
              break;
            case "EXM":
              vautaAsliByBank.EXM += parseInt(data.vauta_asli);
              break;
            case "MDR":
              vautaAsliByBank.MDR += parseInt(data.vauta_asli);
              break;
            default:
              break;
          }
        }
      });
      setVautaAllJenisCount(vautaAsliByBank);

      // Sekarang Anda memiliki total vauta_asli per bank untuk data yang memenuhi kondisi
      console.log(vautaAsliByBank);
    }
  }, [data?.getAllBGs]);

  useEffect(() => {
    if (data) {
      const defaultValues = {
        "Jaminan Penawaran": 0,
        "Jaminan Pelaksanaan": 0,
        "Jaminan Uang Muka": 0,
        "Jaminan Pemeliharaan": 0,
      };

      const vautaAsliByBankAndType: any = {
        BRI: { ...defaultValues },
        BNI: { ...defaultValues },
        EXM: { ...defaultValues },
        MDR: { ...defaultValues },
      };
      data.getAllBGs.forEach((data: any) => {
        if (
          data &&
          data.bank &&
          data.tipe &&
          data.vauta_asli &&
          vautaAsliByBankAndType[data.bank]?.[data.tipe] !== undefined
        ) {
          vautaAsliByBankAndType[data.bank][data.tipe] += parseInt(
            data.vauta_asli
          );
        }
      });

      setVautaAsliByBankAndType(vautaAsliByBankAndType);

      // Sekarang Anda memiliki total vauta_asli per bank dan tipe untuk data yang memenuhi kondisi
      console.log(vautaAsliByBankAndType);
    }
  }, [data?.getAllBGs]);
  const renderAfterPageContent = () => (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>This document is computer-generated and not handcrafted.</p>
    </div>
  );
  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const renderPrograms = () => {
    if (data?.getAllBGs.length === 0) {
      return <p>No bri data found.</p>;
    }

    let programsToRender = data.getAllBGs;
    if (programsToRender.length >= 6) {
      programsToRender = programsToRender.slice(-6);
    }

    return programsToRender.map((program: any) => {
      const calculatedValue = hitungNilaiProgram(program);
      if (!calculatedValue) {
        return null; // Jika calculatedValue tidak valid, return null
      }
      return (
        <CardComponentTypeTwo
          key={calculatedValue.id}
          title={`${program.kode_program} . ${program.bank}`}
          desc={`${
            calculatedValue.jenis === "Margin Deposit"
              ? "MD"
              : calculatedValue.jenis
          }: ${calculatedValue.nilai.toString()}`} // Sesuaikan dengan properti yang sesuai dari program
        />
      );
    });
  };
  // Mendapatkan tanggal saat ini
  const currentDate = new Date();
  // Mengonversi tanggal ke format "dd_mm_yyyy"
  const formattedDate = `${currentDate.getDate()}_${
    currentDate.getMonth() + 1
  }_${currentDate.getFullYear()}`;
  // Nama file PDF yang akan digenerate
  const filename = `${formattedDate}_dashboard_BG.pdf`;
  return (
    <>
      <Button
        placeholder=""
        className="bg-orange-300"
        onClick={() => generatePDF(targetRef, { filename: filename })}
      >
        Download PDF
      </Button>
      <div ref={targetRef}>
        <CardDas
          classa={null}
          column={false}
          title="BG General Performance"
          icon={<CgPerformance className="text-xl text-white" />}
        >
          <CardComponentTypeOne
            highlight={statusProgram.totalActive.count.toString()}
            title="Total BG Active"
            desc={statusProgram.totalActive.status.toString()}
          />
          <CardComponentTypeOne
            highlight={statusProgram.totalExpire.count.toString()}
            title="Total BG Active"
            desc={statusProgram.totalExpire.status.toString()}
          />
          <CardComponentTypeOne
            highlight={statusProgram.totalWarn30.count.toString()}
            title="Total BG Active"
            desc={statusProgram.totalWarn30.status.toString()}
          />
          <CardComponentTypeOne
            highlight={statusProgram.totalWarn60.count.toString()}
            title="Total BG Active"
            desc={statusProgram.totalWarn60.status.toString()}
          />
        </CardDas>

        <CardDas
          classa={null}
          column={false}
          title="BG Added Recently"
          icon={<IoIosAddCircleOutline className="text-xl text-white" />}
        >
          {renderPrograms()}
        </CardDas>

        <CardDas
          classa="flex-wrap"
          column={false}
          title="Captured General BG"
          icon={<TbCaptureFilled className="text-xl text-white" />}
        >
          <div className="w-full py-5 flex justify-around items-start">
            <ul className="w-1/3 list-disc border-[1px] borde p-4 border-gray-700">
              <li className="list-none font-semibold mb-2 text-black flex justify-between items-center">
                Jaminan Agunan
                <CiSettings className="text-2xl text-blue-300" />
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(79,39,91)]"></span>
                  Jaminan Penawaran{" "}
                </Typography>
                <span>{programJenisCount.Jaminan_Penawaran}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(156,78,183)]"></span>
                  Jaminan Pelaksanaan{" "}
                </Typography>
                <span>{programJenisCount.Jaminan_Pelaksanaan}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(196,102,229)]"></span>
                  Jaminan Uang Muka{" "}
                </Typography>
                <span>{programJenisCount.Jaminan_Uang_Muka}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(226,156,243)]"></span>
                  Jaminan Pemeliharaan
                </Typography>{" "}
                <span>{programJenisCount.Jaminan_Pemeliharaan}</span>
              </li>
            </ul>
            <ul className="w-1/3 list-disc border-[1px] borde p-4 border-gray-700">
              <li className="list-none font-semibold mb-2 text-black flex justify-between items-center">
                Bank
                <CiSettings className="text-2xl text-blue-300" />
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(79,39,91)]"></span>
                  Bank BRI{" "}
                </Typography>
                <span>{vautaAllJenisCount.BRI}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(156,78,183)]"></span>
                  Bank BNI{" "}
                </Typography>
                <span>{vautaAllJenisCount.BNI}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(196,102,229)]"></span>
                  Bank EXM{" "}
                </Typography>
                <span>{vautaAllJenisCount.EXM}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(226,156,243)]"></span>
                  Bank MDR
                </Typography>{" "}
                <span>{vautaAllJenisCount.MDR}</span>
              </li>
            </ul>
            <ul className="w-1/3 list-disc border-[1px] borde p-4 border-gray-700">
              <li className="list-none font-semibold mb-2 text-black flex justify-between items-center">
                Komponent Bank Garansi
                <CiSettings className="text-2xl text-blue-300" />
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(23,76,100)]"></span>
                  Provisi{" "}
                </Typography>
                <span>{programJenisCount.Provisi}</span>
              </li>
              <li className="flex justify-between items-center">
                <Typography
                  className="flex items-center"
                  variant="paragraph"
                  placeholder=""
                >
                  <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(45,152,200)]"></span>
                  Margin Deposit{" "}
                </Typography>
                <span>{programJenisCount.Margin_Deposit}</span>
              </li>
            </ul>
          </div>
        </CardDas>

        <CardDas
          classa={null}
          column={false}
          title="Captured Nilai ACtive BG"
          icon={<TbCaptureFilled className="text-xl text-white" />}
        >
          <div className="w-full py-5 flex flex-wrap justify-around items-start">
            {Object.keys(vautaAsliByBankAndType).map((bank) => (
              <ul
                key={bank}
                className="!w-1/2 list-disc border-[1px] borde p-4 border-gray-700"
              >
                <li className="list-none font-semibold mb-2 text-black flex justify-between items-center">
                  {`Bank ${bank}`}
                  <CiSettings className="text-2xl text-blue-300" />
                </li>
                {Object.keys(vautaAsliByBankAndType[bank]).map((tipe) => (
                  <li key={tipe} className="flex justify-between items-center">
                    <Typography
                      className="flex items-center"
                      variant="paragraph"
                      placeholder=""
                    >
                      <span className="w-3 h-3 !aspect-square mr-2 !rounded-full bg-[rgb(79,39,91)]"></span>
                      {tipe}
                    </Typography>
                    <span>{vautaAsliByBankAndType[bank][tipe]}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </CardDas>
      </div>
      {renderAfterPageContent()}
    </>
  );
}

export default GetAllBG;
