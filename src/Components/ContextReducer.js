import React, { createContext, useReducer } from "react";

export const CrudContext = createContext();
const initialStates = {
  order: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        order: state.order.filter((order) => order.id !== action.payload),
      };
    case "UPDATE":
      return {
        ...state,
        order: state.order.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload }
            : order
        ),
      };
    case "SETDATA":
      return {
        ...state,
        order: action.payload,
      };
    default:
      break;
  }
};
export default function ContextReducer({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStates);
  return (
    <>
      <CrudContext.Provider value={{ state, dispatch }}>
        {children}
      </CrudContext.Provider>
    </>
  );
}
