import {Reducer} from 'redux'
import produce from 'immer'

import {AuthState, AuthTypes} from './types'

const INITIAL_STATE: AuthState = {
  token: null,
  signed: false,
  TypeServiceOauth: '',
  loading: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.TypeServiceOauth = action.payload.TypeServiceOauth
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case AuthTypes.SIGN_FAILURE: {
        draft.loading = false;
        draft.signed = false;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
        return state
    }
  });
}

export default reducer