import { createSelector } from 'reselect';

const selectAdmin = (state) => state.admin;

export const selectClients = createSelector(
  selectAdmin,
  (admin) => admin.clients
);
