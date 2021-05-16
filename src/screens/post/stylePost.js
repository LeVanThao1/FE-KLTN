import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/themes';

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

  vertical: {
    paddingVertical: 10,
  },

  inp: {
    height: 35,
    borderWidth: 0.3,
    borderRadius: 6,
  },

  inpPrice: {
    height: 35,
    width: '70%',
    borderWidth: 0.3,
    borderRadius: 6,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  infocmt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
  },

  day: {
    paddingLeft: 20,
  },

  userCmt: {
    marginHorizontal: 10,
    backgroundColor: '#dfdfdf',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingBottom: 4,
  },

  addComment: {
    position: 'relative',
  },

  iconEnter: {
    position: 'absolute',
    right: 12,
    top: 2,
  },

  name: {
    fontWeight: 'bold',
  },

  time: {
    fontSize: 13,
    opacity: 0.6,
  },

  // addCmt: {
  //   width: '100%',
  // },

  cmtInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  addComment: {
    width: '100%',
  },
  comment: {
    width: '90%',
    borderRadius: 50,
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
  imgBookDetail: {
    width: '100%',
    margin: 'auto',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },

  imgBook: {
    width: 150,
    height: 200,
    marginRight: 15,
    resizeMode: 'cover',
    shadowColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },

  picker: {
    padding: 0,
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#111',
  },

  content: {
    padding: 10,
    // borderTopColor: '#111',
    // borderTopWidth: 0.2,
    // marginTop: 15,
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
    color: COLORS.primary,
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
    backgroundColor: '#fff',
  },

  txtPrice: {
    width: '40%',
    borderWidth: 0.3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  txtVND: {
    width: '80%',
    borderWidth: 0.3,
    height: 30,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  ct: {
    paddingVertical: 6,
  },

  txtBold: {
    fontWeight: 'bold',
    paddingVertical: 10,
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
  main: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  elment: {
    paddingVertical: 8,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#696969',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    // borderBottomColor: '#333',
    // borderBottomWidth: 0.5,
  },

  detail: {
    color: COLORS.primary,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
  btn: {
    // paddingHorizontal: 10,
    // padding: 10,
    // marginHorizontal: 85,
    // width: '50%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
