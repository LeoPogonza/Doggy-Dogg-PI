import React from 'react';
import Header from '../../components/Header/Header';
import Form from './Form/Form';
import Footer from '../../components/Footer/Footer';
import './NewDog.css';

function NewDog() {
  return (
    <div className="new_dog">
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default NewDog;
