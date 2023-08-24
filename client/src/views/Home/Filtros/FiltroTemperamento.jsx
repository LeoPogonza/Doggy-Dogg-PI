import React, { useEffect } from 'react';
import { filterDog, getTemperament } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function FiltroTemperamento({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const temp = useSelector((state) => state.temperaments);

  function handleFilter(e) {
    const value = e.target.value;
    setCurrentPage(1);
    dispatch(filterDog(value));
  }

  return (
    <div>
      <select onChange={handleFilter}>
        <option selected disabled>
          Selecciona uno
        </option>
        <option value="All">All Temperaments</option>
        {temp &&
          temp.map((t, i) => {
            return (
              <option value={t.name} key={i}>
                {t.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default FiltroTemperamento;
