import { useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import { Paper, Table,  TableBody,  TableContainer, TableHead, TableRow } from "@material-ui/core";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';

const Home = ({ cryptoData, selectedCurrency}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredData =
    cryptoData &&
    cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

  return (
    <>
    <div className="Home_header">
      
      <h2 className="y_intro">Cryptocurrency Prices by Market Cap</h2>
      <input
        type="text"
        placeholder="Search for a Crypto Currency"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
      {searchTerm.length > 0 && <div className="HomePage_coin_container">
      <TableContainer component={Paper}>
        <Table className="coinTable">
          <TableHead >
            <TableRow >
              <StyledTableCell className="tableHeading">Coin</StyledTableCell>
              <StyledTableCell className="tableHeading">Price</StyledTableCell>
              <StyledTableCell className="tableHeading">24h Change</StyledTableCell>
              <StyledTableCell className="tableHeading">Market Cap</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredData &&
              filteredData.map((coin) => (
                <tr
                  key={coin.id}
                  className="coinID"
                  onClick={() => navigate(`/coinId`)}
                >
                  <td>
                    <div className="coinInfo">
                      <div className="coinImg">
                        <img src={coin.image.small} alt="" />
                      </div>
                      <div className="basicInfo">
                        <div className="symbol">
                          {coin.symbol.toUpperCase()}
                        </div>
                        <div className="name">{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {selectedCurrency.toUpperCase()}{" "}
                    {coin.market_data.current_price[selectedCurrency]}
                  </td>
                  <td
                    className={`${
                      coin.market_data.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>
                    {selectedCurrency.toUpperCase()}{" "}
                    {coin.market_data.market_cap[selectedCurrency]}
                  </td>
                </tr>
              ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>}
      </>
  );
};
export default Home;
