import ChapiService from '../services/chapi-service';

const INITIAL_STATE = {
  messages: [],
  loading: true,
  loadingInit: true,
  error: false,
  pageMsg: 1,
  chapiService: new ChapiService(),
  theEnd: false,
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_MSG_START':
      return { ...state, loading: true, error: false };

    case 'FETCH_MSG_SUCCESS':
      return receivedMessagesBack(state, action.payload);

    case 'FETCH_MSG_SUCCESS_FRONT':
      return { ...state, messages: [...state.messages, action.payload] };

    case 'FETCH_MSG_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_MSG_UPDATED':
      return updateMessage(state, action.payload);

    case 'FETCH_MSG_UPDATED_SENT':
      return updateMessage(state, action.payload, true);

    case 'INCREASE_MSG_PAGE':
      return { ...state, pageMsg: state.pageMsg + 1 };

    case 'THE_END':
      return { ...state, theEnd: true };

    default:
      return state;
  }
};

export default messageReducer;

// ----------- HELPERS -----------

const updateMessage = (state, message, sent) => {
  // console.log('Вот что нам пришло от сервера: ', message);
  const { messages } = state;
  let idx;
  if (sent) {
    idx = messages.findIndex(
      (el) => el._id.startsWith('dummy_message_') && el.text === message.text
    );
  } else idx = messages.findIndex((el) => el._id === message._id);

  console.log('REDUCER: idx: ', idx);
  if (idx === -1) {
    return {
      ...state,
      messages: [...state.messages, message],
    };
  }
  const messagesNew = [
    ...messages.slice(0, idx),
    message,
    ...messages.slice(idx + 1),
  ];

  return {
    ...state,
    messages: messagesNew,
  };
};

const receivedMessagesBack = (state, messages) => {
  // This is to prevent duplication
  const messagesNew = [...messages, ...state.messages].filter(
    (v, i, a) => a.find((el) => el._id === v._id) === v
  );

  return {
    ...state,
    messages: messagesNew,
    loading: false,
    error: false,
    loadingInit: false,
  };
};
