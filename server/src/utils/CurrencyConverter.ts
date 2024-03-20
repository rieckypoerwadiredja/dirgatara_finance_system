import axios from "axios";
import { JSDOM } from "jsdom";

export class CurrencyConverter {
  private from: string;
  private to: string;

  constructor(currencyFrom: string, currencyTo: string) {
    this.from = currencyFrom.trim().toLowerCase();
    this.to = currencyTo.trim().toLowerCase();
  }

  async convertCurrency(amount: number): Promise<number> {
    try {
      const response = await axios.get(
        `https://www.google.com/search?q=${this.from}+to+${this.to}`
      );
      const htmlString = response.data;
      const regex = /([\d,.]+)\s+([A-Z]{3})/g;
      const match = regex.exec(htmlString);
      if (match && match.length >= 3) {
        const value = parseFloat(match[1].replace(/,/g, ""));
        if (!isNaN(value)) {
          return amount * value;
        }
      }
      throw new Error("Failed to parse conversion rate");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
