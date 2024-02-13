import { configureStore } from '@reduxjs/toolkit';
import modalSlice from '../features/modalSlice';

const combinedReducer = {
  modal: modalSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
