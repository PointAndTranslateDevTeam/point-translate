const initialState = "";
const SET_TARGET = "SET_TARGET";

export const setTarget = (target) => {
  return {
    type: SET_TARGET,
    target,
  };
};

const targetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TARGET:
      return action.target;
    default:
      return state;
  }
};

export default targetReducer;
