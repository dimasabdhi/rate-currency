/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const CurrencyTable = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=08d6a89ac512442d9dfcec4571b25aa9`
        );
        const data = await response.json();
        const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];
        const fetchedRates = currencies.map((currency) => ({
          code: currency,
          buy: (1 / parseFloat(data.rates[currency])).toFixed(4),
          exchangeRate: parseFloat(data.rates[currency]).toFixed(4),
          sell: ((1 / parseFloat(data.rates[currency])) * 1.02).toFixed(4),
        }));
        setRates(fetchedRates);
      } catch (error) {
        setError("error fetching data");
      }
    };

    fetchRates();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4">
        <table className="w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Currency</th>
              <th className="py-2 px-4 border">We Buy</th>
              <th className="py-2 px-4 border">Exchange Rate</th>
              <th className="py-2 px-4 border">We Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.code}>
                <td className="border px-4 py-2 text-center">{rate.code}</td>
                <td className="border px-4 py-2 text-center">{rate.buy}</td>
                <td className="border px-4 py-2 text-center">
                  {rate.exchangeRate}
                </td>
                <td className="border px-4 py-2 text-center">{rate.sell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
