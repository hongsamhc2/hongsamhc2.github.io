import React, { useState, useCallback } from "react";
import "../../resources/css/evcharge/searchPlace.css";
const SearchPlace = ({ onClick = () => {}, placeholder = "" }) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const { kakao } = window;
  const ps = new kakao.maps.services.Places();

  const onTextChange = useCallback((e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value === "") {
      setData([]);
      return false;
    }
    search(value);
  }, []);

  const search = useCallback((t) => {
    ps.keywordSearch(t, (data, status, pagination) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <div id="search-area">
        <input
          type="text"
          onChange={onTextChange}
          onClick={onTextChange}
          value={searchText}
          placeholder={placeholder}
        />
      </div>
      <SearchResult
        data={data}
        onClose={() => {
          setData([]);
        }}
        onClick={onClick}
      />
    </>
  );
};

const SearchResult = ({ data, onClose = () => {}, onClick = () => {} }) => {
  const list = data.map((el, i) => {
    return (
      <div
        className="item"
        key={i}
        onClick={(e) => {
          onClick(el.address_name, el.y, el.x);
        }}
      >
        <span>{el.address_name}</span>
      </div>
    );
  });
  return (
    <>
      {data.length <= 0 ? null : (
        <div id="search-result-area">
          <div className="background" onClick={onClose}></div>
          <div className="contents">{list}</div>
        </div>
      )}
    </>
  );
};

export default SearchPlace;
