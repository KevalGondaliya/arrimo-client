import { toast } from "react-toastify";
import { AppDispatch } from "./Index";
import { apiCall } from "@/utils/utils";
import { apiUrl } from "@/utils/apiUrl";
import { createSlice } from "@reduxjs/toolkit";

// create a slice
export interface UserState {
  token: string | null;
  isLoading: boolean;
  eventData: [] | null;
}
const initialState: UserState = {
  token: null,
  isLoading: false,
  eventData: [],
};
export interface User {
  createdAt: string;
  title: string;
  start: string;
  id: number;
  end: string;
  updatedAt: string;
}
export const CalanderSlice = createSlice({
  name: "calander",
  initialState,

  reducers: {
    setEvent: (state, action) => {
      state.eventData = action.payload;
      console.log(action.payload);
    },

    setIsEventLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setEvent, setIsEventLoading } = CalanderSlice.actions;
export default CalanderSlice.reducer;

export const setEventApi =
  (value: any, onSuccessCallback: Function) => (dispatch: AppDispatch) => {
    dispatch(setIsEventLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response);
        toast.success(response.message);
        dispatch(getEventApi("user"));
        dispatch(setIsEventLoading(false));
      };
      const onFailure = (error: any) => {
        onSuccessCallback(error);
        toast.error(error);
        dispatch(setIsEventLoading(false));
      };

      apiCall("POST", apiUrl.addEvent, value, onSuccess, onFailure);
    } catch (error) {
      console.log(error);

      dispatch(setIsEventLoading(false));
    }
  };

export const getEventApi = (role: string) => (dispatch: AppDispatch) => {
  dispatch(setIsEventLoading(true));
  try {
    const onSuccess = (response: any) => {
      console.log(response);
      dispatch(setEvent(response.data));
      dispatch(setIsEventLoading(false));
    };
    const onFailure = (error: any) => {
      dispatch(setIsEventLoading(false));
    };

    apiCall(
      "GET",
      role === "user" ? apiUrl.getUserEvent : apiUrl.getEvent,
      "",
      onSuccess,
      onFailure
    );
  } catch (error) {
    console.log(error);

    dispatch(setIsEventLoading(false));
  }
};

export const editEventApi =
  (value: any, id: number | null, onSuccessCallback: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(setIsEventLoading(true));
    try {
      const onSuccess = (response: any) => {
        onSuccessCallback(response.status);
        dispatch(getEventApi("user"));
        dispatch(setIsEventLoading(false));
      };
      const onFailure = (error: any) => {
        onSuccessCallback(error);
        toast.error(error);
        dispatch(setIsEventLoading(false));
      };

      apiCall(
        "PATCH",
        `${apiUrl.editEvent}/${id}`,
        value,
        onSuccess,
        onFailure
      );
    } catch (error) {
      console.log(error);

      dispatch(setIsEventLoading(false));
    }
  };
export const deleteEventApi =
  (id: number | null) => (dispatch: AppDispatch) => {
    dispatch(setIsEventLoading(true));
    try {
      const onSuccess = (response: any) => {
        dispatch(getEventApi("user"));
        dispatch(setIsEventLoading(false));
      };
      const onFailure = (error: any) => {
        toast.error(error);
        dispatch(setIsEventLoading(false));
      };

      apiCall(
        "DELETE",
        `${apiUrl.deleteEvent}/${id}`,
        "",
        onSuccess,
        onFailure
      );
    } catch (error) {
      console.log(error);

      dispatch(setIsEventLoading(false));
    }
  };
