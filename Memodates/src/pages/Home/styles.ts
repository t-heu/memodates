import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefeff',//'#f5f5fa',
    width: '100%',
  },
  b: {
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 5,
    flexDirection: 'row',
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
  // modalCreateBirthday: {
  //   display: 'none',
  //   padding: 20,
  //   zIndex: 50,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   top: 0,
  //   left: 0,
  //   height: '100%',
  //   width: '100%',
  // },
});

export default styles