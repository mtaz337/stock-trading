import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";
import stock from "../images/stock.jpg"

const StockOverViewPage = () =>{
    return (
        <div>
            <div className="text-center">
                <img src= {stock} alt="stock"/>
                </div>
            <AutoComplete/>
            <StockList/>
        </div>

    )
}

export default StockOverViewPage;