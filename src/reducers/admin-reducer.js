const INITIAL_STATE = { loading: true, error: false };

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CLIENTS_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_CLIENTS_SUCCESS':
      return {
        // ...state,
        clients: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_CLIENTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'FETCH_CLIENT_UPDATED':
      return updateClient(state, action.payload);

    default:
      return state;
  }
};

export default adminReducer;

// HELPERS
const updateClient = (state, client) => {
  // console.log('Вот что нам пришло от сервера: ', message);
  const { clients } = state;
  const idx = clients.findIndex((el) => el._id === client._id);

  const clientsNew = [
    ...clients.slice(0, idx),
    client,
    ...clients.slice(idx + 1),
  ];

  return {
    ...state,
    clients: clientsNew,
  };
};
