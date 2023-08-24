import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getDogs} from '../../../Redux/actions/actions';
import Card from "./Card/Card";
import {Link} from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import './AllCards.css';

function AllCards({currentPage, setCurrentPage, dogsPerPage, indexOfFirstDog, indexOfLastDog}) {

  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  
  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch])

  // console.log(currentPage)
  // console.log(setCurrentPage)

  // ------ PAGINADO ------
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dogsPerPage] = useState(8);

  // const indexOfLastDog = currentPage * dogsPerPage;
  // const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const CurrentDog = dogs.slice(indexOfFirstDog, indexOfLastDog)
  const paginate =(page) => {
    setCurrentPage(page)
  }

  // ------ CARDS ------
  function cards() {
    return (
      CurrentDog.map((dog, i) => (
        <Link to={`/home/${dog.id}`} key={i} className="link_all_cards">
          <Card 
            image={dog.image} 
            name={dog.name} 
            weight_min={dog.weight_min}
            weight_max={dog.weight_max}
            temperament={dog.temperament} 
          /> 
        </Link>
      ))
    )
  }

  // ------ return component (renderizado) ------
  return(
    <div className='AllCards_component'>
      <div className='AllCards'>
        {dogs.length !== 0 ? cards() : <Loader />}
      </div>
      <Pagination 
        dogsPerPage={dogsPerPage} 
        totalPosts={dogs.length} 
        paginate={paginate} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default AllCards;