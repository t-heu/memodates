import React, { useState, useEffect } from 'react';
import {TextInput, Text, View, StyleSheet, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {format} from 'date-fns-tz'

import {offList, create} from '../../services/realm'

const DismissKeyboard = ({children}: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default function CreateBirthdayComponent({route, navigation}: any) {
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())//(new Date() as object | Date);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (route.params) {
      const {dateSelected} = route.params
      setDate(new Date(dateSelected))
    }
  }, [])
 
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(String(currentDate)));
  };
  
  const showMode = (currentMode: string) => {
    setShow(true);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  function HandleSubmit() {
    if(!name) {
      Alert.alert('Error', 'Preencha o campo')
      return
    }

    const regex = new RegExp('^[a-zA-Z]+', 'i')

    if(!regex.test(name)) {
      Alert.alert('Error:','Ensira um nome válido!')
      return
    }

    if(name.split('').length <= 2) {
      Alert.alert('Error', 'Minímo 3 letras')
      return
    }

    offList().then((res: any) => {
      const dataAge = {
        name,
        date: String(date),
        id: "1"
      }
      //console.log(res.length, res)// {} //0
      if(res.length > 0) dataAge.id = String(Number(res[0].id)+1)

      create([dataAge])
      setName('')
      Alert.alert('Salvo com sucesso')
      navigation.navigate('Home')
    }).catch(e => Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde'))
  }
  
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView enabled behavior={"padding"} style={styles.modalCreateBithday} /*keyboardVerticalOffset={100}*/>
        <View style={{padding: 20, paddingTop: 0, paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between' ,alignItems: 'center',marginBottom: 15,marginTop: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#333" />
          </TouchableOpacity> 
        </View>

        <View style={{padding: 20, paddingTop: 10, paddingBottom: 0, backgroundColor: '#fff', height: 400}}>
          <Text style={{fontSize: 20, marginBottom: 10, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#222'}}>Adicionar</Text>

          <Text style={styles.labName}>Nome/Evento</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nome"
            onChangeText={setName}
            value={name}
            placeholderTextColor="#aaa"
            blurOnSubmit={false}
            autoCompleteType="email"
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Text style={styles.labName}>Selecionar a data</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text style={styles.btnDateText}>{format(new Date(date), 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
                  
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TouchableOpacity onPress={() => HandleSubmit()} style={styles.btnSalve}>
            <Text style={styles.btnSalveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  modalCreateBithday: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  labName: {
    marginTop: 10,
    marginBottom: 4,
    color: '#222',
    fontSize: 12,
    fontWeight: 'bold'
  },
  input: {
    padding: 8,
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: '#333',
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 13,
    borderRadius: 4,
    fontSize: 18
  },
  btnSalve: {
    height: 50,
    padding: 15,
    backgroundColor: '#ff6849',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff6849',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnSalveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginTop: 2
  },
  btnDateText: {
    color: '#999',
    fontSize: 18,
  }
});
