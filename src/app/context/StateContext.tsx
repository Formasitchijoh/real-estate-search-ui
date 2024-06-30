"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";

//first create the data structure of the state
//the reducer takes in an initial State and a action that has a type and a payload
//pass these into the initial state and the reducer into the useReducer to return you the state and the dispatch action to update the state

type State = {
  _id: string;
  title: string;
  client: string;
  images: Array<string>;
  gitHubLink: string;
  deploymentLink: string;
};

type Action = {
  type: string;
  payload: any;
};

type Reducer = (state: State[], action: Action) => State[];

type ReducerType = {
  reducer: Reducer;
  initialState: State[];
  children: ReactNode;
};

const StateContext = createContext<
  [State[], React.Dispatch<Action>] | undefined
>(undefined);

export const StateProvider: React.FC<ReducerType> = ({
  reducer,
  initialState,
  children,
}) => {
  const value = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateProvider = (): [State[], React.Dispatch<Action>] => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateProvider must be used within a context");
  }
  return context;
};
