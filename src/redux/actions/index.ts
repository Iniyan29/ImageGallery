// src/redux/actions/index.ts
import { INCREMENT, DECREMENT } from './types';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
