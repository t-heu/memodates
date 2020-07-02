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
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns-tz';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

import {show, create} from '../../services/realm';
import {EventUpdate} from '../../store/ducks/events/action';

interface Props {
  dateSelected: Date;
}

export default function CreateBirthdayComponent({dateSelected}: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState(
    new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
  );
  const [timeEnd, setTimeEnd] = useState(
    new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
  );
  const [Show, setShow] = useState('');
  const [color, setColor] = useState('2');
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState(false);
  const colors = [
    {id: '0', color: '#2ed573'},
    {id: '1', color: '#ffa502'},
    {id: '2', color: '#1e90ff'},
    {id: '3', color: '#eccc68'},
    {id: '4', color: '#9b59b6'},
    {id: '5', color: '#f34b56'},
  ];

  useEffect(() => {
    setDate(new Date(dateSelected));
  }, [dateSelected]);

  const onChangeTimeDate = (event: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate;

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

  async function HandleSubmit() {
    try {
      if (!title) {
        Alert.alert('Error', 'Preencha o campo');
        return;
      }

      const regex = new RegExp('^[a-zA-Z]+', 'i');

      if (!regex.test(title)) {
        Alert.alert('Error:', 'Ensira um nome válido!');
        return;
      }

      if (title.split('').length <= 2) {
        Alert.alert('Error', 'Minímo 3 letras');
        return;
      }

      const res = await RNCalendarEvents.saveEvent(title, {
        //calendarId: '6',
        startDate:
          moment.utc(new Date(date)).format('YYYY-MM-DD') +
          moment.utc(new Date(timeStart)).format('THH:mm:ss.SSS[Z]'),
        endDate: moment
          .utc(new Date(timeEnd))
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      });

      /*const showDbLocal = await show();
      const dataAge = {
        title,
        // date: new Date(date),
        id: '1',
        color: colors[Number(color)].color,
        startDate: new Date(timeStart),
        endDate: new Date(timeEnd),
      };

      if (showDbLocal.length > 0) {
        dataAge.id = String(Number(showDbLocal[showDbLocal.length - 1].id) + 1);
      }

      create([dataAge]);*/
      if (res) {
        setTitle('');
        Alert.alert('Salvo com sucesso');
        dispatch(EventUpdate());
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  return (
    <KeyboardAvoidingView enabled>
      {showDots && (
        <FlatList
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 20,
            right: 0,
            //width: '80%',
            height: 209,
            padding: 9.5,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#eee',
          }}
          data={colors}
          horizontal={false}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() => {
                setColor(item.item.id);
                setShowDots(!showDots);
              }}
              style={[
                {
                  borderRadius: 100,
                  borderWidth: 5,
                  borderColor: colors[item.item.id].color,
                  margin: 5,
                  backgroundColor: '#fff',
                  width: 40,
                  height: 40,
                },
              ]}
            />
          )}
        />
      )}

      <View style={styles.form}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <FontAwesome name={'pencil-square-o'} size={22} color={'#777'} />
          <TextInput
            style={styles.input}
            placeholder="Lembre-me..."
            onChangeText={setTitle}
            value={title}
            placeholderTextColor="#777"
            blurOnSubmit={false}
            multiline={true}
            numberOfLines={5}
            autoCompleteType="email"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.date}>
          <Ionicons name={'md-time'} size={24} color={'#777'} />
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text
              style={{
                fontSize: 18,
                color: '#444',
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
                color: '#444',
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

          <TouchableOpacity
            onPress={() => setShowDots(!showDots)}
            style={[
              {
                borderColor: colors[color].color,
                borderWidth: 5,
                width: 40,
                height: 40,
                borderRadius: 100,
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
            padding: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => HandleSubmit()}
            style={styles.btnAdd}>
            <Text
              style={{
                paddingRight: 10,
                color: '#4e8af7',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Salvar
            </Text>
            <Ionicons name={'md-add'} size={28} color={'#4e8af7'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop: 20,
    //borderTopWidth: 1,
    //borderColor: '#eee',
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
  btnAdd: {
    width: '100%',
    height: 45,
    backgroundColor: '#e1ebfe',
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
