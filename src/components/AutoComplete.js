import { useState ,useEffect, useContext} from "react";
import Finnhub from "../apis/Finnhub";
import { WatchListContext } from "../context/watchListContext";
const AutoComplete = () =>{
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const {addStock}  = useContext(WatchListContext)

    const renderDropDOwn = () =>{
        const dropDownClass = search?"show":null
        return (
            <ul className={`dropdown-menu ${dropDownClass}`}
            style={{height:"500px",
            overflowY:"scroll",
            overflowX:"hidden",
            cursor:"pointer"}}>
              {results.map((res)=>{
                return (
                    <li onClick={()=>{ addStock(res.symbol)
                    setSearch("")}} key={res.symbol}  className="dropdown-item">
                        {res.description}
                        ({res.symbol})
                    </li>
                )
              })}
            </ul>
        )
    }
    useEffect (()=>{
        let isMounted = true
    const fetchData = async() =>{
        try{

        const res = await Finnhub.get("/search",{
            params:{
                q: search
            }
        })
       
        if(isMounted){
            setResults(res.data.result)
        }
        else{
            setResults([])
        }
        }

        catch(err){
          console.log(err)
        }
    }
        if(search.length>0){
            fetchData()
        }
        return ()=> (isMounted = false)
    },[search])
    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown"> 
           <input style={{backgroundColor: "rgba(145,158,171,0.04)"}} id="search" className="form-control" placeholder="search" autoComplete="off" onChange={(e)=>setSearch(e.target.value)}>
            </input>
            <label htmlFor="search">Search</label>
            {renderDropDOwn()}
           </div> 
        </div>
    )
}

export default AutoComplete;