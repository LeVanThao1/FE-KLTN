import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    padding: 7,
    flexDirection: 'row',
  },
  messageBox: {
    borderRadius: 10,
    padding: 10,
    paddingVertical: 5,
  },
  name: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
  },
  time: {
    marginTop: 3,
    color: 'grey',
    fontSize: 11,
  },
});

export default styles;
