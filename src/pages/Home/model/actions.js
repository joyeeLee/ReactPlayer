import {createAsyncThunk } from '@reduxjs/toolkit'

const timerOut = createAsyncThunk("homeTime",()=>{
    return new Promise((success) => {
        setTimeout(function () {
          success(10);
        }, 1000);
      }).then((data) => {
        return data;
      })
    
})
export { timerOut };