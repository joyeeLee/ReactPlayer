import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../pages/Home/model'
const allReducer = {
    [homeReducer.name]: homeReducer.reducer,
}

export default configureStore({
    reducer: allReducer
  })