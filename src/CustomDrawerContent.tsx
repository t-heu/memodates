import React from 'react'
import { ScrollView, Text, Image, View, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNetInfo} from '@react-native-community/netinfo';
import GDrive from 'react-native-google-drive-api-wrapper';

import {ApplicationState} from './store';
import GoogleSign from './components/GoogleSign';
import {SignOut} from './store/ducks/auth/action';
import {create, offList} from './services/realm';

function CustomDrawerContent() {
  const {auth} = useSelector((state: ApplicationState) => state);
  const netinfo = useNetInfo();
  const dispatch = useDispatch();

  function initialized() {
    try {
      GDrive.setAccessToken(auth.token)
      GDrive.init()
  
      if(GDrive.isInitialized()) {
        return 'success'
      } else {
        return 'error'
      } 
    } catch(e) {
      console.log(e)
      return e
    }
  }

  function backup() {
    if (netinfo.isConnected) {
      // const decoded = decode(auth.token as string)
      // console.log(decoded.exp < Date.now() / 1000)

      offList().then((response: any) => {
        try {
          if(initialized() === 'success') {
            const content = JSON.stringify(response)
            
            GDrive.files.createFileMultipart(
              content,
              "application/json", {
                parents: ["root"],
                name: 'memodates-backup.json'
              },
              false).then((res: any) => console.log(res, 'ok')).catch((e: any) => console.log(e))
          }
        } catch(e) {
          console.log(e)
        }
      });
      Alert.alert('salvos!');
    } else {
      Alert.alert('sem conexão');
    }
  }

  async function restored() {
    if (netinfo.isConnected) {
      try {
        if(initialized() === 'success') {
          const response = await (await GDrive.files.get(await GDrive.files.getId("memodates-backup.json", ["root"]), {alt: "media"})).text()

          if (response) create(response);
          Alert.alert('Recuperado com sucesso');
        }
      } catch (e) {
        console.log(e)
        Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
      }
    } else {
      Alert.alert('sem conexão');
    }
  }

  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff6849'}}>
        {auth.signed ? (
          <>
            <Image source={{uri: auth.user.photo}} style={{backgroundColor: 'red', borderRadius: 100, width: 90, height: 90, marginBottom: 20}} />
            <Text style={{color: '#fff'}}>{auth.user.name}</Text>
          </>
        ): (
          <GoogleSign />
        )}
      </View>
      
      <ScrollView>
        <View
          style={{
            padding: 5,
            paddingTop: 15,
          }}>
            <View style={{margin: 5}}>
              <TouchableOpacity
                onPress={() => backup()}
                style={styles.btnSigned}>
                <MaterialIcons
                  name={'backup'}
                  size={26}
                  color={'#ff6849'}
                />
                <Text style={{fontSize: 16, marginLeft: 20}}>Backup</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 5}}>
              <TouchableOpacity
                onPress={() => restored()}
                style={styles.btnSigned}>
                <MaterialIcons
                  name={'file-download'}
                  size={26}
                  color={'#ff6849'}
                />
                <Text style={{fontSize: 16, marginLeft: 20}}>Restaurar</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 5}}>
              <TouchableOpacity
                onPress={async () => {
                  dispatch(SignOut())
                }}
                style={styles.btnSigned}>
                <Ionicons 
                  name={'md-exit'} 
                  size={26} 
                  color={'#ff6849'} 
                />
                <Text style={{fontSize: 16, marginLeft: 20}}>Sair</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  btnSigned: {
    borderRadius: 6,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default CustomDrawerContent