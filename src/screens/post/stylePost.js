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
    // paddingLeft: 10,
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  addpost: {
    padding: 10,
    // margin: 50,
  },

  input: {
    height: 40
  },

  price: {

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
    marginHorizontal:85,
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(68, 108, 179, 1)',
  }
});
