import { GET_DOGS , GET_DETAILS , GET_TEMPERAMENT, DOG_POST ,FILTER_DOG, FILTER_CREATED, DOG_WANTED, ORDER_BY_NAME, ORDER_BY_WEIGHT} from "../actions/actions";

const initialState = {
  dogs: [],
  allDogsFilter: [],
  details: [],
  temperaments: [],
  dogsHome: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        allDogsFilter: payload,
        dogsHome: payload,
      }
    case GET_DETAILS:
      return {
        ...state,
        details: payload
      }
    case DOG_POST:
      return {
        ...state
      }
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload
      }
    case FILTER_DOG:
      const allDogs = state.allDogsFilter;
      const filtro = payload === 'All' ? allDogs : allDogs.filter(e => e.temperament.includes(payload))
      return {
        ...state,
        dogs: filtro
      }
    case FILTER_CREATED:
      const allDogsFilter = state.allDogsFilter;
      const createFilter = payload === 'creados' ?  allDogsFilter.filter(d => d.creadoEnDB) : allDogsFilter.filter(d => !d.creadoEnDB);
      return {
        ...state,
        dogs: payload === "All" ? allDogsFilter : createFilter
      }
    case DOG_WANTED:
      return {
        ...state,
        dogsHome: payload
      }
    case ORDER_BY_NAME:
      const orderDogsName = payload === 'name_asc' ?
        state.dogs.slice().sort(function(a, b) {
          if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
          if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
          return 0;
        }) : 
        state.dogs.slice().sort(function(a, b) {
          if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
          if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
          return 0;
        })
      return {
        ...state,
        dogs: orderDogsName
      }
    case ORDER_BY_WEIGHT:
      const orderDogsKg = payload === 'peso_asc' ?
        state.dogs.slice().sort(function(a, b) {
          if(parseInt(a.weight_min) < parseInt(b.weight_min)) {return -1}
          if(parseInt(b.weight_min) < parseInt(a.weight_min)) {return 1}
          return 0;
        }) : 
        state.dogs.slice().sort(function(a, b) {
          if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return -1}
          if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return 1}
          return 0;
        })
      return {
        ...state,
        dogs: orderDogsKg
      }
    
    default:
      return state
  }
};

export default rootReducer;