import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/index';


export const button = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    color: '#fff',
    textAlign: 'center',
    width: 100,
    marginVertical: 20,
  },

  addPost: {
    zIndex: 50,
    position: 'absolute',
  },

  bgAdd: {
    position: 'absolute',
    top: 80,
    right: 10,
    width: 47,
    height: 47,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  btnAdd: {
    // flex: 1,
    zIndex: 50,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: -3,
    right: 0,
    zIndex: 50,
    width: 46,
    height: 46,
    fontSize: 50,
    color: COLORS.white,
  },
});
