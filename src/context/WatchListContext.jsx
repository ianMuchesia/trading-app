import { createContext , useEffect, useState} from "react";

export const WatchListContext = createContext()



const WatchListContextProvider = (props) => {

    const [ watchList, setWatchList] = useState(localStorage.getItem("watchList")?.split(",")||["GOOGL", 'MSFT','AMZN'])
     
    useEffect(()=>{
        localStorage.setItem("watchList", watchList)
    },[watchList])
    const addStock = (stock)=>{
        //the indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present
        if(watchList.indexOf(stock)===-1){
            setWatchList([...watchList, stock])
        }
        
    }

    const deleteStock =(stock)=>{
        const updatedWatchList = watchList.filter(item=>item!==stock)
        setWatchList(updatedWatchList);
    }


  return <WatchListContext.Provider value={{watchList,  addStock, deleteStock}}>
    {props.children}
  </WatchListContext.Provider> 
}


export default WatchListContextProvider