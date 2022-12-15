import React, { useState, useEffect, useContext } from "react";
import finnhub from "../apis/finnhub";
import { WatchListContext } from "../context/WatchListContext";
const AutoComplete = () => {
  const { addStock } = useContext(WatchListContext);
  const [search, setSearch] = useState("");

  const [result, setResult] = useState([]);

  const renderDropdown = () => {
    const dropdownClass = search ? "" : "hidden";
    return (
      <ul
        className={`${dropdownClass}`}
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
      >
        {result.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                addStock(item.symbol);
                setSearch("");
              }}
            >
              {item.description}({item.symbol})
            </li>
          );
        })}
      </ul>
    );
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        /*   console.log(response); */
        if (isMounted) {
          setResult(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResult([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-[50%] p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          id="search"
          type="text"
          placeholder="search"
          className="border-2"
          style={{ backgroundColor: "rgba(145,158,171,0.04" }}
          autoComplete="off"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <label htmlFor="search"></label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
