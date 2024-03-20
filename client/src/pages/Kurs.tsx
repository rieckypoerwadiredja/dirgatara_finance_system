import axios from "axios";
import React, { useEffect, useState } from "react";

function Kurs() {
  const [exchangeRates, setExchangeRates] = useState<any[]>([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://api.kurs.web.id/api/v1/bi?bank=bi"
        );

        setExchangeRates(response.data.banks);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="App">
      <h1>Kurs Mata Uang ke USD</h1>
      <table>
        <thead>
          <tr>
            <th>Mata Uang</th>
            <th>Kurs Jual</th>
            <th>Kurs Beli</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={rate.kode}>
              <td>{rate.matauang}</td>
              <td>{rate.kurs_jual}</td>
              <td>{rate.kurs_beli}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurs;
