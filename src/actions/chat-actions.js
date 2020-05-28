export const messagesRequested = () => {
  return {
    type: 'FETCH_MSG_START',
  };
};

export const listenMsgNew = () => {
  return {
    type: 'LISTEN_NEW_MSG',
  };
};

export const fetchMessagesSimple = (...payload) => {
  return {
    type: 'FETCH_MSG_SIMPLE',
    payload,
  };
};

export const sendMessage = (payload) => {
  return {
    type: 'SEND_MESSAGE',
    payload,
  };
};

// export const messagesLoaded = (messages) => ({
//   type: 'FETCH_MSG_SUCCESS',
//   payload: messages,
// });

// export const messagesLoadedFront = (message) => ({
//   type: 'FETCH_MSG_SUCCESS_FRONT',
//   payload: message,
// });

// export const messageUpdated = (message) => {
//   return {
//     type: 'FETCH_MSG_UPDATED',
//     payload: message,
//   };
// };

// export const messagesError = (error) => {
//   return {
//     type: 'FETCH_MSG_ERROR',
//     payload: error,
//   };
// };

// export const increaseMsgPage = () => {
//   return {
//     type: 'INCREASE_MSG_PAGE',
//   };
// };
