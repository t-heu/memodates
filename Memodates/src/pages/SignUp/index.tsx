import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns-tz'
import {useDispatch} from 'react-redux';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SignInSuccess } from '../../store/ducks/auth/action'

const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $yourBirthday: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      yourBirthday: $yourBirthday
      name: $name
    ) {
      acess_token
    }
  }
`;

export default function SignUp({navigation}: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const [yourBirthday, setYourBirthday] = useState(new Date())
  const [show, setShow] = useState(false);
  const [Signup, {loading, error}] = useMutation(SIGNUP);
  
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate || yourBirthday;
    setShow(Platform.OS === 'ios');

    setYourBirthday(new Date(String(currentDate)));
  };
  
  const showMode = (currentMode: string) => {
    setShow(true);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  function handleSubmit() {
    if(!password || !email || !name) {
      Alert.alert('Error:','Preencha todos os campos!')
      return
    }

    const regex = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$', 'i')

    if(!regex.test(email)) {
      Alert.alert('Error:','Ensira um Email valido!')
      return
    }

    if(password.split('').length <= 5) {
      Alert.alert('Error', 'Sua senha é muito fraca')
      return
    }

    if (password != confirmPassword) {
      Alert.alert('Error','senhas não iguais, verifique-as')
      return
    }

    Signup({variables: {email, password, yourBirthday, name}})
      .then((data) => {
        dispatch(SignInSuccess({token: data.data.signup.acess_token, TypeServiceOauth: 'em'}))
        navigation.navigate('Home')
      })
      .catch((e) => {
        console.log(e)
        Alert.alert('Error', e)
      });
  }
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20, paddingTop: 0, paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between' ,alignItems: 'center',marginBottom: 15,marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity> 
      </View>

      <View style={{padding: 20, paddingTop: 10, paddingBottom: 0, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 20, marginBottom: 10, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#222'}}>Criar uma conta</Text>
           
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

          <Text style={styles.label}>Nome:</Text>
          <TextInput 
            style={styles.input}
            placeholder='name'
            autoCapitalize='words'
            autoCorrect={false}
            blurOnSubmit={false}
            value={name}
            onChangeText={setName}
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

          <Text style={styles.label}>Confirma Senha:</Text>
          <TextInput 
            style={styles.input}
            placeholder='******'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize='words'
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Data:</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text style={styles.btnDateText}>{format(new Date(yourBirthday), 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
                    
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={yourBirthday}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Criar!</Text>
          </TouchableOpacity>
        </View>
   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#999', 
    borderRadius: 4, 
    borderWidth: 1, 
    marginTop: 0,
    fontSize: 18,
    height: 50,
    paddingHorizontal: 15
  },
  label: {
    marginTop: 10,
    color: '#222', 
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 6, 
    marginBottom: 15, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#4989f7',   
  },
  btnDate: {
    height: 50,
    padding: 15,
    borderStyle: 'solid',
    color: '#333',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'transparent',//'#4989f9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
    marginBottom: 20
  },
  btnDateText: {
    color: '#999',
    fontSize: 18,
  }
})
