import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './loaderSlice';
import employeeReducer from './employeeSlice';
import taskReducer from './taskSlice';

export default configureStore({
  reducer: {
    loaderStore: loaderReducer,
    employeeStore: employeeReducer,
    taskStore: taskReducer
  }
});