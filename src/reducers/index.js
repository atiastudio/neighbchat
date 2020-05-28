import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import chatReducer from './chat-reducer';
import leadReducer from './lead-reducer';
import adminReducer from './admin-reducer';

export default combineReducers({
  user: userReducer,
  chat: chatReducer,
  lead: leadReducer,
  admin: adminReducer,
});
