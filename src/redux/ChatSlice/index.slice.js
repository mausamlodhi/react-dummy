import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: {},
  },
  reducers: {
    handleOnlineUsersAction: (state, action) => {
      return (state = {
        ...state,
        onlineUsers: { ...state.onlineUsers, ...action.payload },
      });
    },
    handleUpdateOnlineUserAction: (state, action) => {
      return (state = {
        ...state,
        onlineUsers: { ...state.onlineUsers, ...action.payload },
      });
    },
  },
});

export const { handleOnlineUsersAction, handleUpdateOnlineUserAction } =
  chatSlice.actions;

export const handleOnlineUsers = (roomMembers) => (dispatch, state) => {
  if (roomMembers?.length > 0) {
    dispatch(
      handleOnlineUsersAction(
        roomMembers.reduce(
          (acc, cur) => ({
            ...acc,
            [cur?.userId]:
              state()?.auth?.userData?.id === cur?.userId
                ? state()?.chat?.onlineUsers?.[cur?.userId]
                : cur?.user?.chatStatus?.status,
          }),
          {},
        ),
      ),
    );
  }
};

export const handleUpdateOnlineUser = (data) => (dispatch) => {
  dispatch(handleUpdateOnlineUserAction(data));
};

export default chatSlice.reducer;
