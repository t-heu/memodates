import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124', //'#f5f5f5', //'#f5f3f4',
    width: '100%',
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
    height: 68,
    paddingTop: 0,
    paddingBottom: 0,
    // borderBottomWidth: 1,
    // borderColor: '#eee',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDay: {
    color: '#eee',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
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
