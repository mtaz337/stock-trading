import { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Finnhub from "../apis/Finnhub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";

const StockList = () =>{
    const [stocks,SetStocks] = useState([]);
    const {watchList, deleteStock} = useContext(WatchListContext);
    const navigate = useNavigate();

    const changeColor = (change) =>{
        return change<0?'danger':'success';
    }

    const chnageIcon = (change) =>{
        return change<0?<BsFillCaretDownFill/>:<BsFillCaretUpFill/>;
    }

    const handleSelect = (stockName) => {
        navigate(`detail/${stockName}`)
    }

useEffect(()=>{
    let isMounted = true
    const fetchData = async () =>{
        try{
           const res = await Promise.all(watchList.map((stock)=>{
            return Finnhub.get('/quote',{
                params:{
                    symbol: stock
                }
            })
           }))

          const data =  res.map((stock)=>{
            return {
                data: stock.data,
                symbol: stock.config.params.symbol
            }
           })

           console.log(data);
           if(isMounted){
            SetStocks(data)
           }
        }
        catch(error){

        }
    }
    fetchData();
    return () => (isMounted = false)
},[watchList])
    return (
        <div>
           <table className="table hover mt-5">
            <thead style={{color:"rgb(79,89,102)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chng</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">PClose</th>
                </tr>
            </thead>
            <tbody>
                {
                    stocks.map((stock)=>{
                        return(
                            <tr onClick={()=>handleSelect(stock.symbol)} className="table-row" key={stock.symbol} style={{cursor:"pointer"}}>
                                <th scope="row">{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={`text-${changeColor(stock.data.d)}`}>{stock.data.d}{chnageIcon(stock.data.d)}</td>
                                <td className={`text-${changeColor(stock.data.dp)}`}>{stock.data.dp}{chnageIcon(stock.data.dp)}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td className="me-4">{stock.data.pc.toFixed(2)}<button className="btn btn-danger btn-sm d-inline-block delete-button" style={{marginLeft: "0.5rem"}}onClick={(e)=>{
                                    e.stopPropagation()
                                    deleteStock(stock.symbol)
                                }}>Remove</button></td>
                                </tr>
                        )
                    })
                }
            </tbody>

            </table>
        </div>
    )
}

export default StockList;