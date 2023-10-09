import { useParams } from "react-router-dom";
import { useState } from "react";
import Finnhub from "../apis/Finnhub";
import { useEffect } from "react";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) =>{
    return data.t.map ((el, index)=>{
        return {
            x: el*1000,
            y: data.c[index]
        }
    })
}
const StockDetailPage = () =>{
    const {stock} = useParams()
    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
        const date = new Date()
        const currentTime = Math.floor(date.getTime()/1000)
        let oneday;
        const day = date.getDay()
        if(day===6){
            oneday = currentTime  - 2*24*60*60;
        }
        else if (day === 0){
            oneday = currentTime - 3*24*60*60;
        }
        else{
            oneday = currentTime - 1*24*60*60;
        }

        const oneWeek = currentTime - 7*24*60*60;
        const oneYear = currentTime - 365*24*60*60;
try{
    const responses = await Promise.all([Finnhub.get("/stock/candle",{
        params:{
            symbol:stock,
            from: oneday,
            to: currentTime,
            resolution: 30
        }
    }),await Finnhub.get("/stock/candle",{
        params:{
            symbol:stock,
            from: oneWeek,
            to: currentTime,
            resolution: 60
        }
    }), await Finnhub.get("/stock/candle",{
        params:{
            symbol:stock,
                from: oneYear,
                to: currentTime,
                resolution: "W"
            }
        })])
        console.log(responses)
        setChartData({
            day: formatData(responses[0].data),
            week: formatData(responses[1].data),
            year: formatData(responses[2].data),
        })
    }
    catch(err){
    console.log(err);
    }
    }
    fetchData()
},[stock])

    return (
        <div>
           {chartData && (
            <div>
                <StockChart chartData={chartData} symbol={stock}/>
                <StockData symbol={stock}/>
            </div>
           )}
        </div>
    )
}

export default StockDetailPage;