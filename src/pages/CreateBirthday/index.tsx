import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns-tz';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {offList, create} from '../../services/realm';

export default function CreateBirthdayComponent({dateSelected}: any) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date()); //(new Date() as object | Date);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDate(new Date(dateSelected));
  }, [dateSelected]);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(String(currentDate)));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  function HandleSubmit() {
    if (!name) {
      Alert.alert('Error', 'Preencha o campo');
      return;
    }

    const regex = new RegExp('^[a-zA-Z]+', 'i');

    if (!regex.test(name)) {
      Alert.alert('Error:', 'Ensira um nome válido!');
      return;
    }

    if (name.split('').length <= 2) {
      Alert.alert('Error', 'Minímo 3 letras');
      return;
    }

    offList()
      .then((res: any) => {
        const dataAge = {
          name,
          date: String(date),
          id: '1',
        };
        //console.log(res.length, res)// {} //0
        if (res.length > 0) {
          dataAge.id = String(Number(res[0].id) + 1);
        }

        create([dataAge]);
        setName('');
        Alert.alert('Salvo com sucesso');
      })
      .catch((e) =>
        Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde'),
      );
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={'padding'} /*keyboardVerticalOffset={100}*/
    >
      <View style={styles.form}>
        <View style={styles.date}>
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text
              style={{
                fontSize: 24,
                paddingLeft: 7,
                paddingRight: 0,
                color: '#f34b56',
              }}>
              {format(new Date(date), 'dd')}
            </Text>
            <Text
              style={{
                fontSize: 12,
                padding: 0,
                paddingLeft: 0,
                color: '#f34b56',
              }}>
              {format(new Date(date), '/MM')}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Tem algum evento em mente?"
          onChangeText={setName}
          value={name}
          placeholderTextColor="#999"
          blurOnSubmit={false}
          multiline={true}
          numberOfLines={5}
          autoCompleteType="email"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={() => HandleSubmit()} style={styles.btnAdd}>
          <Ionicons name={'md-add'} size={28} color={'#f34b56'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    height: 60,
  },
  date: {
    height: 60,
    //borderRightWidth: 2,
    //borderColor: '#ff6849',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 0,
    height: 70,
    color: '#222',
    width: 200,
    backgroundColor: 'transparent',
  },
  btnDate: {
    height: 50,
    padding: 10,
    borderStyle: 'solid',
    color: '#333',
    backgroundColor: 'transparent', //'#4989f9',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  btnDateText: {
    color: '#f9ca24',
    fontSize: 12,
  },
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
