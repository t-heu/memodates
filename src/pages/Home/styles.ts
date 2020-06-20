import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', //'#f5f5fa',
    width: '100%',
  },
  header: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    height: 58,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDay: {
    color: '#222',
    fontSize: 20,
    fontFamily: 'OpenSans-Light',
    fontWeight: '300',
    paddingLeft: 8,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
});

export default styles;
