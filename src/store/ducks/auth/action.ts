import {action} from 'typesafe-actions';

import {AuthTypes, Auth} from './types';

export const SignRequest = () => action(AuthTypes.SIGN_REQUEST);
export const SignInSuccess = ({token, user}: Auth) =>
  action(AuthTypes.SIGN_IN_SUCCESS, {token, user});
export const SignInFailure = () => action(AuthTypes.SIGN_FAILURE);
export const SignOut = () => action(AuthTypes.SIGN_OUT);
