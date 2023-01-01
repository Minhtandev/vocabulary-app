export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const LOG_OUT = "LOG_OUT";

const updateProfile = (payload, state) => {
  let updatedUser = { ...state.user, ...payload };
  return { ...state, user: updatedUser };
};

const logOut = (state) => {
  return { ...state, user: null };
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return updateProfile(action.payload, state);
    case LOG_OUT:
      return logOut(state);
    default:
      return state;
  }
};
