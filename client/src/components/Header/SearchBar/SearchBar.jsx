import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchDogs } from "../../../Redux/actions/actions";
import search_icon from "../../../images/search-icon.svg";
import './SearchBar.css';
import {Link } from "react-router-dom";

function SearchBar() {

  const dispatch = useDispatch()

  const [nameDog, setNameDog] = useState('')

  const dogsHome = useSelector(state => state.dogsHome)

  function handleChange(e){
    setNameDog(e.target.value)
    if(nameDog && nameDog) {
      dispatch(searchDogs(nameDog))
    }
  }

  function handleClick() {
    setNameDog('')
  }

  return(
    <div className="searchBar_Container">
      <div className="divInput_SearchBar">
        <div className="div_button_search">
          <img className="searchIcon" src={search_icon} alt="serach" />
        </div>
        <input className="searchBar" type="text" placeholder="Buscar" onChange={handleChange} value={nameDog}/>
        <button className={nameDog.length > 0 ? "cleaner active" : "cleaner"} onClick={handleClick} >x</button>
      </div>

      <div className={nameDog.length !== 0 ? "divSearchBar_Results active" : "divSearchBar_Results"}>
        <div className="div_nameResult">
          {nameDog && dogsHome.slice(0, 10).map((d, i) => {
            return (
              <div>
                <Link className="results" to={`/home/${d.id}`} key={i}>{d.name}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchBar;