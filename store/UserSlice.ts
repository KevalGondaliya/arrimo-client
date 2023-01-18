import { apiUrl } from "@/apiUrl/apiUrl";
import { apiCall } from "@/utils/utils"; 
import {setLocalStorageValue} from '@/utils/localStorage'
import { createSlice } from "@reduxjs/toolkit"; 
import { AppDispatch } from "./Index";

// create a slice
export interface UserState {
  token: string | null;
  isLoading: boolean;
  userData: any | null;
}
const initialState: UserState = {
  token: null,
  isLoading: false,
  userData: null,
};
export interface User {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  isDelete: boolean;
  lastName: string;
  password: string;
  role: string;
  updatedAt: string;
}
export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(action.payload);
    },
    setUser: (state, action) => {
      state.userData = action.payload;
      console.log(action.payload);
    },
    setIsLoginLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setToken, setUser, setIsLoginLoading } = userSlice.actions;
export default userSlice.reducer;
export const loginApi =
  (value: any, onSuccessCallback: Function) => (dispatch: AppDispatch) => {
    dispatch(setIsLoginLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response.status);
        console.log(response);
        dispatch(setUser(response.data?.data?.user));
        dispatch(setToken(response.data?.token));
        setLocalStorageValue(response.data?.token);
        dispatch(setIsLoginLoading(false));
      };
      const onFailure = (error: any) => {
        onSuccessCallback(error);
        dispatch(setIsLoginLoading(false));
      };

      apiCall("POST", apiUrl.logIn, value, onSuccess, onFailure);
    } catch (error) {
      console.log(error);

      dispatch(setIsLoginLoading(false));
    }
  };
