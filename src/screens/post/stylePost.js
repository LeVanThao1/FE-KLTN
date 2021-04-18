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
  containerImage: {
    marginHorizontal: "2%",
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: "space-between"
  },
  post: {
    width: "45%",
    height: 200,
    resizeMode: "cover"
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
    width: '100%',
    marginLeft: 10,
  },
  text: {
    paddingLeft: 10
    // width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});
