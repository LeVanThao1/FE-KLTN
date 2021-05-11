import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  slider__container: {
    borderRadius: 10,
    marginVertical: 10,
  },
  body: {
    marginHorizontal: 12,
  },
  title: {
    fontSize: 18,
    color: '#f44f4f',
    fontWeight: 'bold',
    borderBottomColor: '#f44f4f',
    borderBottomWidth: 3,
    width: 88,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: 0,
    paddingHorizontal: 12,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#f44f4f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#000',
  },
  all__book: {
    marginVertical: 12,
  },
  scroll__view: {
    paddingBottom: 10,
  },
  bookByCategory: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  seeMoreContainer: {
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  seeMoreText: {
    color: '#0e45b4',
    fontWeight: 'bold',
  },
});
