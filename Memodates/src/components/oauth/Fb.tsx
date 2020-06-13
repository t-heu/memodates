import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Icon from 'react-native-vector-icons/EvilIcons'
import { useDispatch } from 'react-redux'
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { SignInSuccess, SignRequest, SignInFailure } from '../../store/ducks/auth/action'

const OAUTH = gql`
  mutation Oauth($access_token: String!, $TypeServiceOauth: String!) {
    oauth(access_token: $access_token, TypeServiceOauth: $TypeServiceOauth)
  }
`;

export default function Fb() {
  const [oauth, { error, loading }] = useMutation(OAUTH);
  const dispatch = useDispatch()
  
  function handleSubmit() {
    dispatch(SignRequest())
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
          dispatch(SignInFailure())
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            const TypeServiceOauth = 'FACEBOOK'
            oauth({ variables: { access_token: data.accessToken.toString(), TypeServiceOauth } }).then(datas => {
              const token = datas.data.oauth//datas.data.oauth.acess_token
              dispatch(SignInSuccess({token, TypeServiceOauth}))
            }).catch(e => {
              console.log(e)
              Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde')
              dispatch(SignInFailure())
            })
          })
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  return (
    <TouchableOpacity onPress={() => handleSubmit()} style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
      <Icon name="sc-facebook" color={'#fff'} size={26} />
    </TouchableOpacity>
  );
}
