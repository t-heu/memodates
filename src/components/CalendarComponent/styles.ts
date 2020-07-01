import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  header__arrow: {
    borderRadius: 40,
    backgroundColor: '#e14344',
    width: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  header__month: {
    fontSize: 16,
  },
  calendarList: {
    padding: 0,
    margin: 0,
    marginBottom: 1,
  },
  day: {
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 95,
    width: Dimensions.get('window').width / 7,
  },
  events: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  events__item: {
    width: 90,
    padding: 2,
    paddingLeft: 4,
    margin: 1,
    overflow: 'hidden',
    borderRadius: 100,
  },
});
