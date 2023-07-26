import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [stock, setStock] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("/fetchStockData", {
        stock,
        date,
      });

      setResults(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="body">
        <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="search">
              <div>
                <label>Stock</label>
                <input
                  type="text"
                  placeholder="search"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">
                  Date
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          {results?.length > 0 ? (
            <div className="data">
              <p>Open: {results[0]?.o}</p>
              <p>High: {results[0]?.h}</p>
              <p>Low: {results[0]?.l}</p>
              <p>Close: {results[0]?.c}</p>
              <p>Volume: {results[0]?.v}</p>
            </div>
          ) : (
            <>
              <h3>Enter Name and Date</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
