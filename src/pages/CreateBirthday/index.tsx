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
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns-tz';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {offList, create} from '../../services/realm';

export default function CreateBirthdayComponent({
  dateSelected,
  update_list,
}: any) {
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState(new Date()); //(new Date() as object | Date);
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('0');
  const colors = [
    {id: '0', color: '#2ed573'},
    {id: '1', color: '#ffa502'},
    {id: '2', color: '#1e90ff'},
    {id: '3', color: '#eccc68'},
    {id: '4', color: '#9b59b6'},
  ];

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
    if (!summary) {
      Alert.alert('Error', 'Preencha o campo');
      return;
    }

    const regex = new RegExp('^[a-zA-Z]+', 'i');

    if (!regex.test(summary)) {
      Alert.alert('Error:', 'Ensira um nome válido!');
      return;
    }

    if (summary.split('').length <= 2) {
      Alert.alert('Error', 'Minímo 3 letras');
      return;
    }

    offList()
      .then((res: any) => {
        const dataAge = {
          summary,
          date: new Date(date),
          id: '1',
          color: colors[Number(color)].color,
        };
        //console.log(res.length, res)// {} //0
        if (res.length > 0) {
          dataAge.id = String(Number(res[0].id) + 1);
        }

        create([dataAge]);
        setSummary('');
        Alert.alert('Salvo com sucesso');
        update_list(res.length + 1);
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
                color: '#f34b56',
              }}>
              {format(new Date(date), 'dd')}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#f34b56',
              }}>
              {format(new Date(date), '/MMMM')}
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

          <TextInput
            style={styles.input}
            placeholder="Tem algum evento em mente?"
            onChangeText={setSummary}
            value={summary}
            placeholderTextColor="#999"
            blurOnSubmit={false}
            multiline={true}
            numberOfLines={5}
            autoCompleteType="email"
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[
              {
                backgroundColor: colors[color].color,
                width: 50,
                height: 50,
              },
            ]}
          />
        </View>

        <View
          style={{
            borderColor: '#eee',
            borderTopWidth: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => HandleSubmit()}
            style={styles.btnAdd}>
            <Text style={{paddingRight: 10, color: '#fff'}}>Salvar</Text>
            <Ionicons name={'md-add'} size={28} color={'#fff'} />
          </TouchableOpacity>

          <FlatList
            data={colors}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => setColor(item.item.id)}
                style={[
                  {
                    backgroundColor: colors[item.item.id].color,
                    width: 50,
                    height: 50,
                  },
                ]}
              />
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 70,
    color: '#222',
    backgroundColor: 'transparent',
  },
  btnDate: {
    height: 50,
    borderStyle: 'solid',
    color: '#333',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnDateText: {
    color: '#f9ca24',
    fontSize: 12,
  },
  btnAdd: {
    width: '35%',
    height: 50,
    //borderRadius: 50,
    backgroundColor: '#f34b56',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
