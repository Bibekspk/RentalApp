import { createStore, applyMiddleware, compose } from "redux"; //for creating store 
import thunk from "redux-thunk";// middleware for returning function rather than action
import { persistStore, persistReducer } from "redux-persist"; //to persist the store 
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistRed = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistRed,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

export { persistor };
export default store;
