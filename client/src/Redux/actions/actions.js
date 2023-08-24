import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const DOG_POST = 'DOG_POST';
export const FILTER_DOG = 'FILTER_DOG';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const DOG_WANTED = 'DOG_WANTED';

export const getDogs = () => {
  return async function(dispatch) {
    try {
      let dogs = (await axios("http://localhost:3001/dogs")).data
      return dispatch({
      type: GET_DOGS,
      payload: dogs
    })
    } catch(error) {
      console.log(error)
    }
  }
}

export const getDetail = (id) => {
  return async function(dispatch) {
    try {
      let details = (await axios(`http://localhost:3001/dogs/${id}`)).data
      return dispatch({
      type: GET_DETAILS,
      payload: details
    })
  } catch (error) {
    console.log(error)
  }
}
}

export const dogPost = (payload) => {
  return async function(dispatch) {
    try {
      await axios.post("http://localhost:3001/dogs", payload);
      alert("perro creado correctamente")
      return dispatch({
        type: DOG_POST
      })
    } catch (error) {
      console.log(error)
      alert("perro no creado")
    }
  }
}

export const getTemperament = () => {
  return async function(dispatch) {
    try {
      let temperaments = (await axios("http://localhost:3001/temperaments")).data;
      let allTemps = temperaments.map(e => e)
      return dispatch({
        type: GET_TEMPERAMENT,
        payload: allTemps
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const searchDogs = (raza) => {
  return async function(dispatch) {
    try {
      let dogsWanted = (await axios(`http://localhost:3001/search?name=${raza}`)).data;
      return dispatch({
        type: DOG_WANTED,
        payload: dogsWanted
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const filterDog = (payload) => {
  return {
    type: FILTER_DOG,
    payload
  }
}

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload
  }
}