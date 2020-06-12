/**
 * Action types
 */
export enum AuthTypes {
  SIGN_REQUEST = '@auth/SIGN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE = '@auth/SIGN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT'
}

/**
 * Data Types
 */
export interface Auth {
  token: string
  TypeServiceOauth: string
}

/**
 * State Types
 */
export interface AuthState {
  readonly token: null | string
  readonly signed: boolean
  readonly TypeServiceOauth: string
  readonly loading: boolean
}