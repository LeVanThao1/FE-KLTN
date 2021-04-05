import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container_view: {margin: 5},
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {fontSize: 18, fontWeight: 'bold'},
  main: {margin: 15},
  search: {flexDirection: 'row', marginVertical: 10},
  input: {borderWidth: 0.5, width: '70%', height: 35, borderRadius: 5},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
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
