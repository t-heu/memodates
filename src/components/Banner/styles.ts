import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fefeff', //'#f5f5fa',
    width: '100%',
  },
  profile: {
    backgroundColor: '#0d6ec6' /*'#4989f7'*/,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnSigned: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 5,
    borderRadius: 6,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 40,
    height: 40,
    backgroundColor: '#0abde3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default styles;
