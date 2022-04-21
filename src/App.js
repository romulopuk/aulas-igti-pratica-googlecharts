import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import _ from "lodash";
import "./App.css";
import Inputs from "./components/Inputs";
import Total from "./components/total";

function App() {
  const maxValue = 999999999;

  const [chartData, setChartData] = useState([]);

  const [bills, setBills] = useState(1);
  const [rent, setRent] = useState(1);
  const [cleaning, setCleaning] = useState(1);
  const [card, setCard] = useState(1);
  const [market, setMarket] = useState(1);

  const handleBillsChange = (newBills) =>
    setBills(newBills === "" ? 0 : newBills);

  const handleRentChange = (newRent) => setRent(newRent === "" ? 0 : newRent);

  const handleCleaningChange = (newCleaning) =>
    setCleaning(newCleaning === "" ? 0 : newCleaning);

  const handleCardChange = (newCard) => setCard(newCard === "" ? 0 : newCard);

  const handleMarketChange = (newMarket) =>
    setMarket(newMarket === "" ? 0 : newMarket);

  const total =
    parseInt(bills) +
    parseInt(rent) +
    parseInt(cleaning) +
    parseInt(card) +
    parseInt(market);

  const loadData = (data) => {
    const values = _.groupBy(data, (value) => value.contas);

    const result = _.map(values, (value, key) => {
      return [key, _.sumBy(values[key], (v) => v.valores)];
    });

    return [["Tipo Conta", "Valores"], ...result];
  };

  useEffect(() => {
    const data = [
      { contas: "Consumo", valores: parseInt(bills) },
      { contas: "Aluguel", valores: parseInt(rent) },
      { contas: "Faxina", valores: parseInt(cleaning) },
      { contas: "Cartão", valores: parseInt(card) },
      { contas: "Mercado", valores: parseInt(market) },
    ];

    setChartData(loadData(data));
    console.log(data);
  }, [total]);

  const options = {
    title: "",
    pieHole: 0.2,
    is3D: false,
  };

  return (
    <div className="App">
      <h1>Gráficos de Despesas</h1>
      <div>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          loader={<div>Carregando...</div>}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <h2>Despesas</h2>
      <div className="container">
        <Inputs
          id="bills"
          labelDescription="Contas de Consumo: "
          inputValue={
            bills === ""
              ? 0
              : bills < 0
              ? 0
              : bills > maxValue
              ? maxValue
              : bills
          }
          maxlength={9}
          onInputChange={handleBillsChange}
        />
        <Inputs
          id="rent"
          labelDescription="Aluguel: "
          inputValue={
            rent === "" ? 0 : rent < 0 ? 0 : rent > maxValue ? maxValue : rent
          }
          onInputChange={handleRentChange}
        />
        <Inputs
          id="cleaning"
          labelDescription="Faxina: "
          inputValue={
            cleaning === ""
              ? 0
              : cleaning < 0
              ? 0
              : cleaning > maxValue
              ? maxValue
              : cleaning
          }
          onInputChange={handleCleaningChange}
        />
        <Inputs
          id="card"
          labelDescription="Cartões: "
          inputValue={
            card === "" ? 0 : card < 0 ? 0 : card > maxValue ? maxValue : card
          }
          onInputChange={handleCardChange}
        />
        <Inputs
          id="market"
          labelDescription="Mercado: "
          inputValue={
            market === ""
              ? 0
              : market < 0
              ? 0
              : market > maxValue
              ? maxValue
              : market
          }
          onInputChange={handleMarketChange}
        />
        <Total id="total" labelDescription="Total: " inputValue={total} />
      </div>
    </div>
  );
}

export default App;
