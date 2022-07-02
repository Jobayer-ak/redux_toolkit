const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducer = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK"; 

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockedCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream (){
    return {
        type: ICECREAM_ORDERED,
        payload: 1,
    }
}

function restockedIceCream (qty=1){
    return {
        type: ICECREAM_RESTOCK,
        payload: qty,
    }
}


// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamSate = {
    numOfIceCreams: 20,
}

// previousState, action => newState

// cake reducer
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          ...state,
          numOfCakes: state.numOfCakes - 1,
        };
  
      case CAKE_RESTOCKED:
          return {
              ...state,
              numOfCakes: state.numOfCakes + action.payload,
          }
      
          
      default:
        return state;
    }
  };


// icecream reducer
const iceCreamReducer = (state = initialIceCreamSate, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
        return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - action.payload
        }

    case ICECREAM_RESTOCK:
        return {
            ...state,
            numOfIceCreams: state.numOfIceCreams + action.payload,
        }
        
    default:
      return state;
  }
};

// store

// const store = createStore(reducer);

//combine reducer
const rootReducer = combineReducer({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer);

console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated store ", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockedCake(3));

const actions = bindActionCreators({orderCake, restockedCake, orderIceCream, restockedIceCream}, store.dispatch);
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockedCake(3)

actions.orderIceCream();
actions.orderIceCream();
actions.restockedIceCream(2);


// unsubscribe store
unsubscribe();
// store.dispatch(orderCake());
