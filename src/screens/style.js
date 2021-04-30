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
    zIndex: 50,
    position: 'absolute',
  },
  btnAdd: {
    // flex: 1,
    zIndex: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 10,
    right: 10,
    zIndex: 50,
    width: 47,
    height: 47,
    fontSize: 50,
    color: 'orange',
    // backgroundColor: 'rgba(68, 108, 179, 1)',
  },
});
