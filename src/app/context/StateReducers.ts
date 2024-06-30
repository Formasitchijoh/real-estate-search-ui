"use client";

import { reducerCases } from "./constants";
export const initialStates = [
  {
    _id: "1",
    title: "Project A",
    client: "Client A",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ],
    gitHubLink: "https://github.com/user/project-a",
    deploymentLink: "https://example.com/project-a",
  },
  {
    _id: "2",
    title: "Project B",
    client: "Client B",
    images: [
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
      "https://example.com/image6.jpg",
    ],
    gitHubLink: "https://github.com/user/project-b",
    deploymentLink: "https://example.com/project-b",
  },
  {
    _id: "3",
    title: "Project C",
    client: "Client C",
    images: [
      "https://example.com/image7.jpg",
      "https://example.com/image8.jpg",
      "https://example.com/image9.jpg",
    ],
    gitHubLink: "https://github.com/user/project-c",
    deploymentLink: "https://example.com/project-c",
  },
];
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
  payload: State;
};

const StateReducer = (state: State[], action: Action) => {
  switch (action.type) {
    case reducerCases.ADD_PROJECT:
      const newProject = {
        id: action.payload._id,
        title: action.payload.title,
      };
      console.log(
        `new task testing the statereducer function  i have created`,
        { newProject },
      );

      return [newProject, ...state];
  }
};

export default StateReducer;
