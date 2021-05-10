import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default styles;
