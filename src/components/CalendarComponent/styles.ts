import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  header__month: {
    fontSize: 19,
    color: '#eee',
  },
  calendarList: {
    padding: 0,
    margin: 0,
    marginBottom: 1,
  },
  day: {
    borderWidth: 0.4,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 95,
    width: Dimensions.get('window').width / 7,
  },
  events: {
    //flexDirection: 'row',
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
