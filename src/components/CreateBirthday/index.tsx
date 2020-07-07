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
import {useDispatch, useSelector} from 'react-redux';

import {ApplicationState} from '../../store';
import {EventCreate, EventSave} from '../../store/ducks/events/action';

export default function CreateBirthdayComponent() {
  const {event} = useSelector((state: ApplicationState) => state.events);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
  );
  const [endDate, setEndDate] = useState(
    new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
  );

  //const [Show, setShow] = useState('');
  const [color, setColor] = useState('2');
  const [ShowDate, setShowDate] = useState(false);
  const [ShowHours, setShowHours] = useState(false);
  const colors = [
    {id: '0', color: '#2ed573'},
    {id: '1', color: '#ffa502'},
    {id: '2', color: '#30a8e3'},
    {id: '3', color: '#eccc68'},
    {id: '4', color: '#f34b56'},
  ];

  useEffect(() => {
    if (event.date) {
      setDate(event.date);
    }
    if (event.title) {
      setTitle(event.title);
    }
    if (event.endDate) {
      setEndDate(new Date(event.endDate));
    }
    if (event.startDate) {
      setStartDate(new Date(event.startDate));
    }
  }, [event]);

  const onChangeDate = (eventt: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate;

    setShowDate(false);
    if (currentDate) {
      setDate(new Date(String(currentDate)));
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const onChangeHours = (eventt: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate;

    setShowHours(false);
    if (currentDate) {
      setStartDate(new Date(String(currentDate)));
      setEndDate(new Date(String(currentDate)));
    }
  };

  const showTimeStartpicker = () => {
    setShowHours(true);
  };

  async function HandleSubmit() {
    try {
      if (!title) {
        Alert.alert('Error', 'Preencha o campo');
        return;
      }

      if (!new RegExp('^[a-zA-Z]+', 'i').test(title)) {
        Alert.alert('Error:', 'Ensira um nome válido!');
        return;
      }

      dispatch(
        EventCreate({
          event: {title, date, startDate, endDate, id: event.id},
        }),
      );
    } catch (e) {
      console.log(e);
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    } finally {
      setTitle('');
      if (event.id) {
        dispatch(EventSave({event: {id: ''}}));
      }
    }
  }

  return (
    <KeyboardAvoidingView enabled>
      {/*showDots && (
        <FlatList
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 20,
            right: 0,
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
                  width: 45,
                  height: 45,
                },
              ]}
            />
          )}
        />
      )*/}

      <View style={styles.form}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
          <FontAwesome name={'pencil-square-o'} size={22} color={'#222'} />
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
              {format(new Date(startDate), 'HH:mm')}
            </Text>
          </TouchableOpacity>

          {ShowDate && (
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

          {ShowHours && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={startDate}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChangeHours}
            />
          )}

          {/*<TouchableOpacity
            onPress={() => setShowDots(!showDots)}
            style={[
              {
                borderColor: colors[color].color,
                borderWidth: 4,
                width: 30,
                height: 30,
                borderRadius: 100,
              },
            ]}
          />*/}
        </View>

        <View
          style={{
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
                color: '#eee',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Salvar
            </Text>
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
  },
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    width: '90%',
    fontSize: 18,
    height: 60,
    color: '#222',
    backgroundColor: 'transparent',
  },
  btnDate: {
    height: 50,
    color: '#444',
    marginLeft: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnAdd: {
    width: '100%',
    height: 45,
    backgroundColor: '#f34b56',
    opacity: 1,
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
