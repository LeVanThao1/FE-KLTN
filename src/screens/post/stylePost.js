import {StyleSheet} from 'react-native';
export const stylesPost = StyleSheet.create({
  textDes: {
    height: 'auto',
    borderWidth: 0.5,
    borderColor: '#696969',
    color: '#f00',
    borderRadius: 8,
    marginVertical: 10,
    padding: 8,
    minHeight: 120,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  day: {
    paddingLeft: 20,
  },

  name: {
    fontWeight: 'bold',
  },

  time: {
    fontSize: 13,
    opacity: 0.6,
  },

  comment: {
    borderRadius: 50,
    flex: 1,
    borderWidth: 0.1,
    paddingHorizontal: 20,
    marginLeft: 20,
    height: 35,
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
    marginHorizontal: '2%',
    flexDirection: 'row',
    marginVertical: 10,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  post: {
    width: '45%',
    height: 200,
    resizeMode: 'cover',
    marginRight: 5,
  },

  img: {
    padding: 10,
    borderTopColor: '#111',
    borderTopWidth: 0.2,
    marginTop: 15,
    flexDirection: 'row',
  },

  picker: {
    padding: 0,
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#111',
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
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  heart_cmt: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },

  titlePost: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'rgba(68, 108, 179, 1)',
    fontSize: 18,
  },

  titleCenter: {
    textAlign: 'center',
    alignItems: 'center',
  },

  txtInput: {
    borderWidth: 0.3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
  },

  txtPrice: {
    width: '80%',
    borderWidth: 0.3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
  },

  ct: {
    paddingVertical: 6,
  },

  txtBold: {
    fontWeight: 'bold',
  },

  textImg: {
    marginVertical: 10,
  },

  textCount: {
    paddingLeft: 10,
  },
  textContent: {
    width: '100%',
    marginLeft: 10,
  },
  text: {
    // paddingLeft: 10,
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  elment: {
    paddingVertical: 8,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#696969',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  detail: {
    color: 'rgba(68, 108, 179, 1)',
  },

  addpost: {
    padding: 10,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    height: 40,
  },

  textareaContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    // padding: -3?0,
    // marginTop: -10,
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
  },
  btn: {
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 85,
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(68, 108, 179, 1)',
  },
});
