// src/redux/reducers/index.ts
import { INCREMENT, DECREMENT } from '../actions/types';

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default reducer;
