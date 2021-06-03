import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: 25,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 3,
  },
  btnAdd: {
    fontSize: 25,
    color: COLORS.white,
    marginRight: 10,
  },
});
