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

  const [Show, setShow] = useState('');
  const [color, setColor] = useState('2');
  const [showDots, setShowDots] = useState(false);
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

  const onChangeTimeDate = (eventt: any, selectedDate: any) => {
    const currentDate: Date | object = selectedDate;

    if (currentDate) {
      if (Show === 'date') {
        setShow('');
        setDate(new Date(String(currentDate)));
      } else {
        setShow('');
        setStartDate(new Date(String(currentDate)));
        setEndDate(new Date(String(currentDate)));
      }
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
      {showDots && (
        <FlatList
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 20,
            right: 0,
            height: 209,
            padding: 9.5,
            backgroundColor: '#202124',
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
                  backgroundColor: '#202124',
                  width: 45,
                  height: 45,
                },
              ]}
            />
          )}
        />
      )}

      <View style={styles.form}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
          <FontAwesome name={'pencil-square-o'} size={22} color={'#eee'} />
          <TextInput
            style={styles.input}
            placeholder="Lembre-me..."
            onChangeText={setTitle}
            value={title}
            placeholderTextColor="#eee"
            blurOnSubmit={false}
            multiline={true}
            numberOfLines={5}
            autoCompleteType="email"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.date}>
          <Ionicons name={'md-time'} size={24} color={'#eee'} />
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDate}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
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
                color: '#fff',
              }}>
              {format(new Date(startDate), 'HH:mm')}
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
              value={startDate}
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
                borderWidth: 4,
                width: 30,
                height: 30,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={{
            //borderColor: '#444',
            //borderTopWidth: 1,
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
    backgroundColor: '#202124',
    flexDirection: 'column',
    marginTop: 20,
  },
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderTopWidth: 1,
    // borderColor: '#444',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    width: '90%',
    fontSize: 18,
    height: 60,
    color: '#fff',
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
    backgroundColor: '#297070',
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
