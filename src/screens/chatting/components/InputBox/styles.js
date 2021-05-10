import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // zIndex: 999,
    flexDirection: 'row',
    margin: 10,
    // bottom: 55,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 35,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
