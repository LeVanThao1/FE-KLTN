import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {queryData} from '../../../common';
import {GET_SUB_ORDERS_STORE} from '../../../query/subOrder';
import {COLORS} from '../../../constants/themes';

export default function Statistics() {
  const [subOrders, setSubOrders] = useState([]);
  const [option, setOption] = useState('day');
  const [labels, setLabels] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [todayData, setTodayData] = useState({
    todayOrder: 0,
    todayRevenue: 0,
    todayBook: 0,
  });

  const CHART_HEIGHT = 200;

  const config = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#ffffff',
    },
  };

  const previousYear = (currentYear) => {
    return +currentYear - 1 + '';
  };
  const previousMonth = (currentMonth) => {
    if (currentMonth.slice(5, 7) === '01') {
      return `${+currentMonth.slice(0, 4) - 1}-${12}`;
    }
    return `${currentMonth.slice(0, 4)}-${(
      '0' +
      (+currentMonth.slice(5, 7) - 1)
    ).slice(-2)}`;
  };
  const previousDay = (currentDay) => {
    return new Date(new Date(currentDay).getTime() - 1000 * 60 * 60 * 24)
      .toISOString()
      .slice(0, 10);
  };
  const options = {
    year: {
      slice: [0, 4],
      display: [0, 4],
      loop: 4,
      previous: previousYear,
    },
    month: {
      slice: [0, 7],
      display: [5, 7],
      loop: 12,
      previous: previousMonth,
    },
    day: {
      slice: [0, 10],
      display: [5, 10],
      loop: 30,
      previous: previousDay,
    },
  };

  const transformData = (data, option = 'year') => {
    const dates = [];
    const nowTime = new Date().toISOString().slice(...options[option].slice);
    dates.push([nowTime, 0, 0]);
    for (let i = 1; i < options[option].loop; i++) {
      dates.push([options[option].previous(dates[i - 1][0]), 0, 0]);
    }
    dates.reverse();
    const value = data.reduce((obj, {createdAt, amount, price}) => {
      let key = createdAt.slice(...options[option].slice);
      if (obj[key]) {
        obj[key][0] += 1;
        obj[key][1] += amount * price;
      } else {
        obj[key] = [1, amount * price];
      }
      return obj;
    }, {});
    for (let date of dates) {
      if (value[date[0]]) {
        date[1] = value[date[0]][0];
        date[2] = value[date[0]][1];
      }
    }
    const labels = dates.map(([label, value1, value2]) =>
      label.slice(...options[option].display),
    );
    const amountSubOrders = dates.map(([label, value1, value2]) => value1);
    const totalRevenue = dates.map(([label, value1, value2]) => value2);
    setLabels(labels);
    setOrders(amountSubOrders);
    setRevenues(totalRevenue);
  };

  useEffect(() => {
    queryData(GET_SUB_ORDERS_STORE).then(({data: {subOrdersByStore}}) => {
      let arraySubOrders = subOrdersByStore.map(({createdAt, detail}) => ({
        createdAt,
        ...detail,
      }));
      setSubOrders(arraySubOrders);
    });
  }, []);

  useEffect(() => {
    transformData(subOrders, option);
  }, [subOrders, option]);

  useEffect(() => {
    let today = new Date(Date.now()).toISOString().slice(0, 10);
    let result = subOrders.reduce(
      (obj, {createdAt, amount, price}) => {
        if (today === createdAt.slice(0, 10)) {
          obj.todayOrder += 1;
          obj.todayRevenue += amount * price;
          obj.todayBook += amount;
        }
        return obj;
      },
      {todayOrder: 0, todayRevenue: 0, todayBook: 0},
    );
    setTodayData(result);
  }, [subOrders]);

  function Cart({label, value}) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    );
  }

  function Tab({name, value}) {
    return (
      <TouchableOpacity onPress={() => setOption(value)}>
        <Text style={value == option ? styles.tabSelected : styles.tab}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <Cart label="Đơn Hàng" value={todayData.todayOrder} />
        <Cart label="Sách Bán" value={todayData.todayBook} />
        <Cart label="Doanh Thu" value={todayData.todayRevenue} />
      </View>
      <View style={styles.tabContainer}>
        <Tab name="Ngày" value="day" />
        <Tab name="Tháng" value="month" />
        <Tab name="Năm" value="year" />
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Doanh thu</Text>
            <ScrollView horizontal>
              {subOrders.length && orders.length ? (
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: revenues,
                      },
                    ],
                  }}
                  width={Math.max(
                    Dimensions.get('window').width - 24,
                    options[option].loop * 50,
                  )} // from react-native
                  height={CHART_HEIGHT}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={config}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              ) : null}
            </ScrollView>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Đơn hàng</Text>
            <ScrollView horizontal>
              {subOrders.length && orders.length ? (
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: orders,
                      },
                    ],
                  }}
                  width={Math.max(
                    Dimensions.get('window').width - 24,
                    options[option].loop * 50,
                  )} // from react-native
                  height={CHART_HEIGHT}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={3} // optional, defaults to 1
                  chartConfig={config}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              ) : null}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  card: {
    width: '30%',
    padding: 8,
    backgroundColor: COLORS.primary,
    // borderColor: COLORS.primary,
    // borderWidth: 1,
    borderRadius: 5,
  },
  cardLabel: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  cardValue: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    margin: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
  },
  tabSelected: {
    margin: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.primary,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  chartContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chartTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
