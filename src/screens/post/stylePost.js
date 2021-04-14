import {StyleSheet} from 'react-native';
export const stylesPost = StyleSheet.create({
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    paddingLeft: 20,
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingLeft: 20,
  },
  avtcmt: {
    width: 30,
    height: 30,
    borderRadius: 50,
    paddingLeft: 20,
  },
  post: {
    width: '100%',
    height: '60%',
  },

  content: {
    padding: 10,
    borderTopColor: '#111',
    borderTopWidth: 0.2,
    marginTop: 15,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  heart_cmt: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textCount: {
    paddingLeft: 10,
  },
  textContent: {
    width: '75%',
    marginLeft: 10,
  },
  text: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
