import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns-tz';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

import {show, create} from '../../services/realm';
import {EventSuccess} from '../../store/ducks/events/action';

interface Props {
  dateSelected: string;
}

export default function CreateBirthdayComponent({dateSelected}: Props) {
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState(
    new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.040Z`),
  );
  const [timeEnd, setTimeEnd] = useState(new Date('2020-06-27T10:01:00.040Z'));
  const [Show, setShow] = useState('');
  const [color, setColor] = useState('2');
  const dispatch = useDispatch();
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

  const onChangeTimeDate = (event: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate;

    //setShow(Platform.OS === 'ios');

    if (Show === 'date') {
      setShow('');
      setDate(new Date(String(currentDate)));
    } else {
      setShow('');
      setTimeStart(new Date(String(currentDate)));
      setTimeEnd(new Date(String(currentDate)));
    }
  };

  const showDatepicker = () => {
    setShow('date');
  };

  const showTimeStartpicker = () => {
    setShow('time');
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

    show()
      .then((res: any) => {
        const dataAge = {
          summary,
          date: new Date(date),
          id: '1',
          color: colors[Number(color)].color,
          start: new Date(timeStart),
          end: new Date(timeEnd),
        };

        if (res.length > 0) {
          dataAge.id = String(Number(res[res.length - 1].id) + 1);
        }

        create([dataAge]);
        setSummary('');
        Alert.alert('Salvo com sucesso');
        show().then((events: any) => {
          dispatch(EventSuccess({events}));
        });
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
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <FontAwesome name={'pencil-square-o'} size={22} color={'#222'} />
          <TextInput
            style={styles.input}
            placeholder="Lembre-me..."
            onChangeText={setSummary}
            value={summary}
            placeholderTextColor="#555"
            blurOnSubmit={false}
            multiline={true}
            numberOfLines={5}
            autoCompleteType="email"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.date}>
          <Ionicons name={'md-time'} size={24} color={'#222'} />
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text
              style={{
                fontSize: 18,
                color: '#222',
              }}>
              {format(new Date(date), "dd 'de' MMMM 'de' yyyy")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showTimeStartpicker}
            style={styles.btnDate}>
            <Text
              style={{
                fontSize: 22,
                color: '#222',
              }}>
              {format(new Date(timeStart), 'HH:mm')}
            </Text>
          </TouchableOpacity>

          {Show === 'date' && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeTimeDate}
            />
          )}

          {Show === 'time' && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={timeStart}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChangeTimeDate}
            />
          )}

          <View
            style={[
              {
                backgroundColor: colors[color].color,
                width: 40,
                height: 40,
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
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    width: '90%',
    fontSize: 18,
    height: 60,
    color: '#444',
    backgroundColor: 'transparent',
  },
  btnDate: {
    height: 50,
    color: '#444',
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
    height: 45,
    backgroundColor: '#f34b56',
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
