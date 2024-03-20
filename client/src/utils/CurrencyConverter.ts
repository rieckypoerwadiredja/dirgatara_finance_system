export default async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
) {
  return 5 * 5;
  //   try {
  //     const response = await fetch(
  //       `https://api.example.com/exchangerate?from=${fromCurrency}&to=${toCurrency}`
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       return data.exchangeRate;
  //     } else {
  //       throw new Error("Failed to fetch exchange rate");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Failed to fetch exchange rate");
  //   }
}
