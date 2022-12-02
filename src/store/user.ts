//예시용으로 만든 리덕스 툴킷. 여기서는 사용 안합니다.

import { createSlice } from '@reduxjs/toolkit';

type userType = {
  id: number;
  name: string;
  age: number;
  phone_number: string;
}

const initialStateValue = [{id: 1, name: "황호세", age: 26, phone_number: "010-3645-2422"}] as userType[]

export const userSlice = createSlice({
  name: "user",
  initialState: {userArr: initialStateValue, lastId: 1},
  reducers: {
    addUser: (state, action) => {
      state.lastId = state.lastId + 1;
      action.payload.id = state.lastId;
      state.userArr.push(action.payload);
    },
    /*
    updateUser: (state, action) => {
      state.userArr.find(user => user.id === action.payload.id).id = action.payload.id;
    },
    */
    deleteUser: (state, action) => {
      state.userArr = state.userArr.filter(user => user.id !== action.payload);
    },
    sortUser: (state) => {
      state.userArr.sort((a, b) => a.id - b.id);
    }
  },
});

//updateUser
export const { addUser, sortUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;