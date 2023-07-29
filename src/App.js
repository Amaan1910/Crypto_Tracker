
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const [cryptoData, setCryptoData] = useState(null);
  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/`
      );
      setCryptoData(data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    fetchCoinData();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home cryptoData={cryptoData} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />}/>
        
      </Routes>
    </div>
  );
}

export default App;
