import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserId = createSelector(selectUser, (user) => user._id);
export const selectUserRole = createSelector(selectUser, (user) => user.role);
export const selectUserBan = createSelector(selectUser, (user) => user.isBan);
export const selectConnection = createSelector(
  selectUser,
  (user) => user.isConnect
);

export const selectUserLoading = createSelector(
  selectUser,
  (user) => user.loading
);
export const selectUserError = createSelector(selectUser, (user) => user.error);
export const selectErrMsg = createSelector(selectUserError, (error) => {
  if (!error) return;
  const errCol = `${error}`.split(':');
  return errCol[errCol.length - 1];
});

export const selectLastReadMsg = createSelector(
  selectUser,
  (user) => user.lastReadMsg
);

export const selectUserProfile = createSelector(selectUser, (user) => {
  const { name, email, photo } = user;
  const userProfile = { name, email, photo };
  return userProfile;
});

export const selectUserPhoto = createSelector(selectUser, (user) => user.photo);
