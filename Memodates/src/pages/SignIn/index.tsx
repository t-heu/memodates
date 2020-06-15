import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useDispatch} from 'react-redux';

import { SignInSuccess } from '../../store/ducks/auth/action'

const SIGNIN = gql`
  mutation Signin(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    )
  }
`;

export default function SignIn({navigation}: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const [Signin, {loading, error}] = useMutation(SIGNIN);

  function handleSubmit() {
    if(!password || !email) {
      Alert.alert('Error:','Preencha todos os campos!')
      return
    }

    const regex = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$', 'i')

    if(!regex.test(email)) {
      Alert.alert('Error:','Ensira um Email valido!')
      return
    }

    Signin({variables: {email, password}})
      .then((data) => {
        dispatch(SignInSuccess({token: data.data.signin, TypeServiceOauth: 'EMAIL'}))
        navigation.navigate('Home')
      })
      .catch((e) => {
        console.log(e)
        Alert.alert('Error', e)
      });
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20, paddingTop: 0, paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between' ,alignItems: 'center',marginBottom: 15,marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20, paddingTop: 10, paddingBottom: 0, backgroundColor: '#fff'}}>
        <Text style={{fontSize: 20, marginBottom: 10, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#222'}}>Entrar</Text>
 
        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input}
          placeholder='email@outloo.com'
          keyboardType={'email-address'}
          autoCapitalize='words'
          autoCorrect={false}
          blurOnSubmit={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput 
          style={styles.input}
          placeholder='******'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='words'
          blurOnSubmit={false}
        />

        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{alignItems: 'center', padding: 15}}>
          <Text style={{color: '#222'}}>Não tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#999', 
    borderRadius: 4, 
    borderWidth: 1, 
    marginTop: 5, 
    height: 50,
    fontSize: 18,
    paddingHorizontal: 15
  },
  label: {
    marginTop: 10,
    color: '#222', 
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 6, 
    marginTop: 5, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0d6ec6',
  }
})
