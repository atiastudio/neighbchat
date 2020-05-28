import { createSelector } from 'reselect';

const selectLead = (state) => state.lead;

export const selectRequests = createSelector(
  selectLead,
  (lead) => lead.requests
);
export const selectLeadLoadingInit = createSelector(
  selectLead,
  (lead) => lead.loadingInit
);
export const selectLeadPage = createSelector(selectLead, (lead) => lead.page);
