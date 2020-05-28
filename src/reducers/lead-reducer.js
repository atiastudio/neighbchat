const INITIAL_STATE = {
  loading: true,
  error: false,
  page: 1,
  requests: [],
  loadingInit: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_LEAD_START':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'FETCH_LEAD_SUCCESS':
      return fetchLeadSuccess(state, action.payload);

    case 'FETCH_LEAD_SUCCESS_NEW':
      return {
        ...state,
        requests: [...state.requests, action.payload],
        loading: false,
        error: false,
      };
    case 'FETCH_LEAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_LEAD_UPDATED':
      return updateRequests(state, action.payload);

    case 'INCREASE_LEAD_PAGE':
      return { ...state, pageMsg: state.pageMsg + 1 };

    default:
      return state;
  }
};

export default userReducer;

// HELPERS

const updateRequests = (state, request) => {
  // console.log('Вот что нам пришло от сервера: ', message);
  const { requests } = state;
  const idx = requests.findIndex((el) => el._id === request._id);

  const requestsNew = [
    ...requests.slice(0, idx),
    request,
    ...requests.slice(idx + 1),
  ];

  return {
    ...state,
    requests: requestsNew,
    // loading: false,
    // error: false,
  };
};

const fetchLeadSuccess = (state, requests) => {
  // This is to sort in necessary order
  // console.log('REDUCER: This is new requests:', requests);
  // console.log('REDUCER: This is old requests:', state.requests);
  const requestsNew = [...requests, ...state.requests].sort((a, b) => {
    if (!a.isCompleted && b.isCompleted) return -1;
    if (a.isCompleted && !b.isCompleted) return 1;
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  return {
    ...state,
    requests: requestsNew,
    loading: false,
    error: false,
    loadingInit: false,
  };
};
