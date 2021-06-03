import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

const styles = StyleSheet.create({
  container__header: {
    flexDirection: 'column',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  header__text: {
    fontSize: 20,
  },
  header__menu: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 35,
    color: '#fff',
  },
  search: {
    height: 35,
    width: '70%',
    color: '#111',
    backgroundColor: '#fff',
    position: 'relative',
    paddingLeft: 10,
    fontSize: 17,
    padding: 0,
    borderRadius: 6,
  },
  searchIcon: {
    position: 'absolute',
    right: 55,
    zIndex: 1,
    opacity: 0.4,
    fontSize: 24,
  },
  message: {
    color: '#fff',
    left: 10,
    zIndex: 1,
  },
  container: {
    backgroundColor: COLORS.primary,
  },
});

export default styles;
