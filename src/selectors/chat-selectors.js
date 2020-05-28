import { createSelector } from 'reselect';

import { selectLastReadMsg } from './user-selectors';

const selectChat = (state) => state.chat;

export const selectChapiService = createSelector(
  selectChat,
  (chat) => chat.chapiService
);

export const selectMessages = createSelector(
  selectChat,
  (chat) => chat.messages
);
export const selectMsgLoading = createSelector(
  selectChat,
  (chat) => chat.loading
);
export const selectMsgError = createSelector(selectChat, (chat) => chat.error);
export const selectMsgPage = createSelector(selectChat, (chat) => chat.pageMsg);
export const selectTheEnd = createSelector(selectChat, (chat) => chat.theEnd);
export const selectMsgLoadingInit = createSelector(
  selectChat,
  (chat) => chat.loadingInit
);

export const selectMsgUnreadNum = createSelector(
  selectMessages,
  selectLastReadMsg,
  (messages, lastReadMsg) => {
    let i = 0;
    for (let index = 0; index < messages.length; index++) {
      const el = messages[index];
      if (!el._id.startsWith('service_') && el.createdAt > lastReadMsg) i++;
    }
    return i;
  }
);
