import {StyleSheet} from 'react-native';

export const button = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: 'rgba(68, 108, 179, 1)',
    color: '#fff',
    textAlign: 'center',
    width: 100,
    marginVertical: 20,
  },

  addPost: {
    position: 'absolute',
    width: '35%',
    fontSize: 14,
    // flex: 1,
    justifyContent: 'center',
    padding: 5,
    margin: 0,
    backgroundColor: 'rgba(68, 108, 179, 1)',
    color: '#fff',
    textAlign: 'center',
    // marginVertical: 20,
    borderRadius: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});
