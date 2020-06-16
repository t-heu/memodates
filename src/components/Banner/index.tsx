import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Alert, Text} from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';

import GoogleSign from '../GoogleSign';
import styles from './styles';
import {SignOut} from '../../store/ducks/auth/action';
import {create, offList} from '../../services/realm';
import {ApplicationState} from '../../store';

export default function Banner() {
  const {auth} = useSelector((state: ApplicationState) => state);
  const netinfo = useNetInfo();
  const dispatch = useDispatch();
  //const navigation = useNavigation();

  function backup() {
    if (netinfo.isConnected) {
      offList().then((response: any) => {
        response.map((res: any) => {
          try {
            console.log(res);
            // createBirthday({
            //   variables: {name: res.name, date: res.date, idExist: res.id},
            // });
          } catch (e) {
            Alert.alert(
              'Alguma coisa deu errado, \n tente novamente mais tarde',
            );
          }
        });
      });
      Alert.alert('salvos!');
    } else {
      Alert.alert('sem conexão');
    }
  }

  function restored() {
    try {
      // if (data) {
      //   create(data.profile.birthday);
      // }
      Alert.alert('Recuperado com sucesso');
    } catch (e) {
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          {auth.signed ? (
            <>
              <View
                style={{
                  padding: 5,
                  paddingTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: auth.user.photo}}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 15,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Light',
                  }}>
                  {auth.user.name}
                </Text>
              </View>

              <View
                style={{
                  padding: 5,
                  paddingTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={() => backup()}
                    style={styles.btnSigned}>
                    <MaterialIcons
                      name={'backup'}
                      size={26}
                      color={'#0d6ec6'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={() => restored()}
                    style={styles.btnSigned}>
                    <MaterialIcons
                      name={'file-download'}
                      size={26}
                      color={'#0d6ec6'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={async () => {
                      dispatch(SignOut());
                      //client.resetStore({data})
                    }}
                    style={styles.btnSigned}>
                    <Ionicons name={'md-exit'} size={26} color={'#0d6ec6'} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <GoogleSign />
          )}
        </View>
      </View>
    </View>
  );
}
