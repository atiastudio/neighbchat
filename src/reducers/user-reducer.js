const INITIAL_STATE = { loading: true, error: false, isConnect: true };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USER_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        // ...state,
        ...action.payload,
        loading: false,
        error: false,
        isConnect: true,
      };
    case 'FETCH_USER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_LAST_READ_MESSAGE':
      return {
        ...state,
        lastReadMsg: action.payload,
      };

    case 'DISCONNECTED':
      return {
        ...state,
        isConnect: false,
      };
    case 'CONNECTED':
      return {
        ...state,
        isConnect: true,
      };

    default:
      return state;
  }
};

export default userReducer;
