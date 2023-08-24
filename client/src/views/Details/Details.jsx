import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import DogDetail from './DogDetail/DogDetail';
import { getDetail } from '../../Redux/actions/actions';
import Footer from '../../components/Footer/Footer';
import './Details.css';

function Details(props) {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.details);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className="details_component">
      <Header />
      <DogDetail dog={dog[0]} />
      <Footer />
    </div>
  );
}

export default Details;
