import {action} from 'typesafe-actions'

import {AuthTypes, Auth} from './types'

export const SignRequest = () => action(AuthTypes.SIGN_REQUEST) 
export const SignInSuccess = ({token, TypeServiceOauth}: Auth) => action(AuthTypes.SIGN_IN_SUCCESS, {token, TypeServiceOauth})
export const SignInFailure = () => action(AuthTypes.SIGN_FAILURE)
export const SignOut = () => action(AuthTypes.SIGN_OUT) 