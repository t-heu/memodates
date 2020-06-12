import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useNetInfo } from '@react-native-community/netinfo'
import {useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux"

import Back from '../../../assets/25119768207_269ef5a104_b.jpg';
import styles from './styles'
import FBoauth from '../oauth/Fb'
import { SignOut } from "../../store/ducks/auth/action"
import {create, offList} from '../../services/realm'
import {ApplicationState} from '../../store'

const CREATEBIRTHDAY = gql`
  mutation CreateBirthday($name: String!, $date: String!, $idExist: String) {
    createBirthday(name: $name, date: $date, idExist: $idExist) {
      date
      name
    }
  }
`;

const PROFILE = gql`
  query Profile {
    profile {
      email
      name
      yourBirthday
      birthday {
        id
        name
        date
      }
    }
  }
`;

export default function Banner() {
  const configDate = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']
  }
  const {auth} = useSelector((state: ApplicationState) => state)
  const [ham, setHam] = useState(false)
  const [openCloseEmail, setOpenCloseEmail] = useState(false)
  const [createBirthday] = useMutation(CREATEBIRTHDAY);
  const netinfo = useNetInfo()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {data} = useQuery(PROFILE)

  function backup() {
    if (netinfo.isConnected) {
      offList().then((response: any) => {
        response.map((res: any) => {
          try {
            createBirthday({ variables: { name: res.name, date: res.date, idExist: res.id } })
          } catch(e) {
            Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde')
          }
        })
      })
      Alert.alert('salvos!')
    } else {
      Alert.alert('sem conexão')
    }
  }

  function restored() {
    try {
      if (data) create(data.profile.birthday)
      Alert.alert('Recuperado com sucesso')
    } catch(e) {
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde')
    }
  }
  
  return (
    <View style={styles.container}>            
      {ham ? (
        <View style={{backgroundColor: '#4989f7', height: 200, justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          {auth.loading ? (
            <View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', position: 'absolute', top: 0, left: 0, zIndex: 10, height: 200, width: '100%'}}>
              <View style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
                <SimpleLineIcons name={'reload'} size={26} color={'#222'} />
              </View>
            </View>
          ):(
            null
          )}
          
          <View style={{justifyContent: 'center', alignItems: "center", position: 'absolute', right: 13, top: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40}}>
            <TouchableOpacity onPress={() => {
              setHam(!ham)
              if(openCloseEmail) setOpenCloseEmail(!openCloseEmail)
            }}>
              <MaterialIcons name={'close'} size={26} color={'#fff'}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 0}}>
            <View style={{marginLeft: 0, marginRight: 0, flexDirection: 'row'}}>
              { auth.signed ? (
                <>
                  <View style={{marginLeft: 0, marginRight: 5}}>
                    <TouchableOpacity onPress={() => backup()} style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
                      <MaterialIcons name={'backup'} size={26} color={'#fff'} />
                    </TouchableOpacity>
                  </View>

                  <View style={{marginLeft: 5, marginRight: 5}}>
                    <TouchableOpacity 
                      onPress={() => restored()} 
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
                      <MaterialIcons name={'file-download'} size={26} color={'#fff'}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginLeft: 5, marginRight: 0}}>
                    <TouchableOpacity onPress={async() => {
                      dispatch(SignOut())
                      //client.resetStore({data})
                    }} style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
                      <Ionicons name={'md-exit'} size={26} color={'#fff'} />
                    </TouchableOpacity>
                  </View>
                </>
              ):(
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 5, marginRight: 5}}>
                    <FBoauth />
                  </View>

                  <View style={{marginLeft: 5, marginRight: 0}}>
                    <TouchableOpacity onPress={() => setOpenCloseEmail(!openCloseEmail)} style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
                      <MaterialIcons name={'email'} size={26} color={'#fff'} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
          {openCloseEmail && !auth.signed && (
            <View style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 14, flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 100, height: 36, width: 100,}}>
                <Text style={{color: '#4989f7', fontWeight: 'bold'}}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 100, height: 36, width: 100,}}>
                <Text style={{color: '#4989f7', fontWeight: 'bold'}}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ):(
        <ImageBackground source={Back} style={{height: 200, justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'absolute', zIndex: 20, right: 13, top: 11, backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 5, borderRadius: 6, width: 40, height: 40, justifyContent: 'center', alignItems: "center"}}>
            <TouchableOpacity onPress={() => setHam(!ham)}>
              <Entypo name={'list'} size={26} color={'#4989f7'}/>
            </TouchableOpacity>
          </View>

            <Text 
              style={{color: '#fff', fontSize: 30, fontFamily: 'OpenSans-Light',  fontWeight: '300'}}
            >
              {`Hoje é ${configDate.dayNames[new Date().getDay()]} `}
            </Text>
        </ImageBackground>
      )}
    </View>
  );
}
