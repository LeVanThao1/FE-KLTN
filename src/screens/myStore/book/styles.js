import {StyleSheet, Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  // container_view: {margin: 5},
  // container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  // header: {fontSize: 18, fontWeight: 'bold'},
  // main: {margin: 15},
  // search: {flexDirection: 'row', marginVertical: 10},
  // input: {borderWidth: 0.5, width: '70%', height: 35, borderRadius: 5},
  // head: {height: 40, backgroundColor: '#808B97'},
  // text: {margin: 6},
  // row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  // btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  // btnText: {textAlign: 'center', color: '#fff'},
  container_product: {
    margin: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: rgba(68, 108, 179, 1),
  },
  title: {
    marginVertical: 5,
    marginHorizontal: 12,
  },
  name: {
    marginVertical: 8,
  },

  input: {
    height: 35,
    width: '100%',
    paddingLeft: 10,
    borderWidth: 0.2,
    borderRadius: 6,
    position: 'relative',
  },

  inputPrice: {
    width: '70%',
    height: 35,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderRadius: 6,
    position: 'relative',
  },

  price: {
    width: '100%',
  },
  image: {
    marginVertical: 10,
  },
  picker: {
    padding: 0,
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#111',
  },
  des: {
    marginTop: 10,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  listRecomment: {
    position: 'absolute',
    top: 65,
    width: Dimensions.get('screen').width - 40,
    bottom: 0,
    zIndex: 999,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 0,
  },
  recomment: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    // borderTopColor: 'grey',
    // borderTopWidth: 1,
    paddingVertical: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 8,
  },
  content_main: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  content_name: {
    fontSize: 13,
    fontWeight: 'bold',
    width: Dimensions.get('screen').width - 138,
  },
  content_description: {
    fontSize: 13,
    width: Dimensions.get('screen').width - 138,
  },
  content_author: {
    fontSize: 13,
    width: Dimensions.get('screen').width - 138,
  },

  horizontal: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textarea: {
    // padding: -3?0,
    // marginTop: -10,
    position: 'relative',
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
    backgroundColor: '#fff',
    paddingRight: 35,
  },
  txtInput: {
    width: '60%',
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
    width: '60%',
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
    width: '90%',
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
  txtMaxWidth: {
    width: '100%',
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.2,
    marginVertical: 4,
    paddingRight: 40,
    position: 'relative',
  },
});
export const stylesTable = StyleSheet.create({
  tableGrid: {
    marginTop: 50,
    width: '100%',
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',

    padding: 10,

    backgroundColor: '#eee',
    borderColor: '#111',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: '100%',
  },
  column: {
    flex: 1,
    width: 100,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  id: {
    width: 50,
    alignItems: 'center',
  },
});
