import { createSlice } from '@reduxjs/toolkit'
import {timerOut} from './actions'
export const HomeModel = createSlice({
  name: 'home',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1
    },
  },
  extraReducers(builder){
    builder.addCase(timerOut.pending,(state,action)=>{
        console.log(11111)
    }).addCase(timerOut.fulfilled,(state,action)=>{
        console.log(22222)
    })
  }
})

export default HomeModel