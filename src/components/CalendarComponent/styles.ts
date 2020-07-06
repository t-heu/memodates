import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 10,
      width: 1,
    },
    elevation: 3,
    shadowRadius: 3,
  },
  header__month: {
    fontSize: 19,
    fontFamily: 'OpenSans-SemiBold',
    color: '#222',
  },
  calendarList: {
    padding: 0,
    margin: 0,
    marginBottom: 1,
  },
  day: {
    borderWidth: 0.4,
    borderColor: '#eee',
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    height: Dimensions.get('window').height / 6.2, //95,
    width: Dimensions.get('window').width / 7,
  },
  events: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  events__item: {
    width: Dimensions.get('window').width / 7.6,
    padding: 1,
    paddingLeft: 3,
    justifyContent: 'center',
    paddingRight: 3,
    margin: 1,
    marginLeft: 0,
    overflow: 'hidden',
    borderRadius: 4,
  },
});
