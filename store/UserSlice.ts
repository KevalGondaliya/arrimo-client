import { toast } from "react-toastify";
import { AppDispatch } from "./Index";
import { apiCall } from "@/utils/utils";
import { apiUrl } from "@/utils/apiUrl";
import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageValue } from "@/utils/localStorage";

// create a slice
export interface UserState {
  token: string | null;
  isLoading: boolean;
  userData: [] | null;
  logInUserData: object;
}
const initialState: UserState = {
  token: null,
  isLoading: false,
  userData: [],
  logInUserData: {},
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
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    logInUser: (state, action) => {
      state.logInUserData = action.payload;
    },
    logOutUser: (state) => {
      state.logInUserData = {};
      state.userData = [];
      state.token = null;
      state.isLoading = false;
    },

    setIsLoginLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setToken, setUser, logOutUser, logInUser, setIsLoginLoading } =
  userSlice.actions;
export default userSlice.reducer;

// For Login Api Calling
export const loginApi =
  (value: any, onSuccessCallback: Function) => (dispatch: AppDispatch) => {
    dispatch(setIsLoginLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response.status);
        console.log(response);
        dispatch(logInUser(response.data?.user));
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

// For Add User Api Calling
export const setUserApi =
  (value: any, onSuccessCallback: Function) => (dispatch: AppDispatch) => {
    dispatch(setIsLoginLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response.status);
        dispatch(getUserApi());
        dispatch(setIsLoginLoading(false));
      };
      const onFailure = (error: any) => {
        onSuccessCallback(error);
        toast.error(error);
        dispatch(setIsLoginLoading(false));
      };

      apiCall("POST", apiUrl.setUser, value, onSuccess, onFailure);
    } catch (error) {
      console.log(error);

      dispatch(setIsLoginLoading(false));
    }
  };

// For Get User Event Api Calling
export const getUserApi = () => (dispatch: AppDispatch) => {
  dispatch(setIsLoginLoading(true));
  try {
    const onSuccess = (response: any) => {
      console.log(response);
      dispatch(setUser(response.data));
      dispatch(setIsLoginLoading(false));
    };
    const onFailure = (error: any) => {
      dispatch(setIsLoginLoading(false));
    };

    apiCall("GET", apiUrl.setUser, "", onSuccess, onFailure);
  } catch (error) {
    console.log(error);

    dispatch(setIsLoginLoading(false));
  }
};

// For Edit User Api Calling
export const editUserApi =
  (value: any, id: number, onSuccessCallback: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(setIsLoginLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response.status);
        dispatch(getUserApi());
        dispatch(setIsLoginLoading(false));
      };
      const onFailure = (error: any) => {
        onSuccessCallback(error);
        toast.error(error);
        dispatch(setIsLoginLoading(false));
      };

      apiCall("PATCH", `${apiUrl.editUser}/${id}`, value, onSuccess, onFailure);
    } catch (error) {
      console.log(error);

      dispatch(setIsLoginLoading(false));
    }
  };

// For Delete User APi Calling
export const deleteUserApi = (id: number) => (dispatch: AppDispatch) => {
  dispatch(setIsLoginLoading(true));
  try {
    const onSuccess = (response: any) => {
      dispatch(getUserApi());
      dispatch(setIsLoginLoading(false));
    };
    const onFailure = (error: any) => {
      toast.error(error);
      dispatch(setIsLoginLoading(false));
    };

    apiCall("DELETE", `${apiUrl.deleteUser}/${id}`, "", onSuccess, onFailure);
  } catch (error) {
    console.log(error);

    dispatch(setIsLoginLoading(false));
  }
};
