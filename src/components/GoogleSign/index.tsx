import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';

import {
  SignInSuccess,
  SignRequest,
  SignInFailure,
} from '../../store/ducks/auth/action';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive'],//https://www.googleapis.com/auth/drive.readonly
  webClientId:
    '544070490320-86b9dkrqn7bpvfsmio8mebf0p8ll096o.apps.googleusercontent.com',
});

export default function GoogleSign() {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false)
  const dispatch = useDispatch();

  async function signIn() {
    setIsSigninInProgress(true)
    dispatch(SignRequest());
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //setUserInfo(userInfo.idToken);
      //console.log(userInfo);
      dispatch(SignInSuccess({token: (await GoogleSignin.getTokens()).accessToken, user: userInfo.user}));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelled');
        dispatch(SignInFailure());
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('already');
        dispatch(SignInFailure());
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('not available');
        dispatch(SignInFailure());
      } else {
        // some other error happened
        console.log(error);
        dispatch(SignInFailure());
      }
    }
  }

  return (
    <GoogleSigninButton
      style={{width: 252, height: 50}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
      disabled={isSigninInProgress}
    />
  );
}
