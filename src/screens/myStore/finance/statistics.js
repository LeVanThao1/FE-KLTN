import {Text, View} from 'native-base';
import React,{useEffect, useState} from 'react';
import {Dimensions} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {queryData} from "../../../common"
import {GET_SUB_ORDERS_STORE} from "../../../query/subOrder"
const Statistics = () => {

  const [option, setOption] = useState("day");
  const [labels, setLabels] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const parseData = (labels, amountOrders, saleValues) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Total Orders",
          type: "bar",
          data: amountOrders,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y-axis-2",
        },
        {
          label: "Sales Value",
          type: "bar",
          data: saleValues,
          fill: false,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgba(54, 162, 235, 0.5)",
          yAxisID: "y-axis-1",
        },
      ],
    };
  };

  const transformData = (data, option = "year") => {
    const previousYear = (currentYear) => {
      return +currentYear - 1 + "";
    };
    const previousMonth = (currentMonth) => {
      if (currentMonth.slice(5, 7) === "01") {
        return `${+currentMonth.slice(0, 4) - 1}-${12}`;
      }
      return `${currentMonth.slice(0, 4)}-${+currentMonth.slice(5, 7) - 1}`;
    };
    const previousDay = (currentDay) => {
      return new Date(new Date(currentDay).getTime() - 1000 * 60 * 60 * 24)
        .toISOString()
        .slice(0, 10);
    };
    const options = {
      year: {
        slice: [0, 4],
        loop: 4,
        previous: previousYear,
      },
      month: {
        slice: [0, 7],
        loop: 13,
        previous: previousMonth,
      },
      day: {
        slice: [0, 10],
        loop: 31,
        previous: previousDay,
      },
    };
    const dates = [];
    const nowTime = new Date().toISOString().slice(...options[option].slice);
    dates.push([nowTime, 0, 0]);
    for (let i = 1; i < options[option].loop; i++) {
      dates.push([options[option].previous(dates[i - 1][0]), 0, 0]);
    }
    dates.reverse();
    // console.log("dates", dates);
    const value = data.reduce((obj, order) => {
      let key = order.dateOrder.slice(...options[option].slice);
      if (obj[key]) {
        obj[key][0] += 1;
        obj[key][1] += order.intoMoney;
      } else {
        obj[key] = [1, order.intoMoney];
      }
      return obj;
    }, {});
    // console.log(value);
    for (let date of dates) {
      if (value[date[0]]) {
        // console.log(value[date[0]]);
        date[1] = value[date[0]][0];
        date[2] = value[date[0]][1];
      }
    }
    const labels = dates.map(([label, value1, value2]) => label);
    const amountOrders = dates.map(([label, value1, value2]) => value1);
    const saleValues = dates.map(([label, value1, value2]) => value2);
    return parseData(labels, amountOrders, saleValues);
  };

  useEffect(()=>{
    queryData(GET_SUB_ORDERS_STORE).then(({data: {subOrdersByStore}}) => {
      let subOrders = subOrdersByStore.map(({createdAt, detail}) => ({createdAt, ...detail}));
      console.log(subOrders);
      let computeObject = subOrders.reduce((obj, {createdAt, amount, price}) => {
        let date = createdAt.slice(0, 10);
        if(obj[date]){
          obj[date].order += 1;
          obj[date].revenue += amount * price;
        }else{
          obj[date] = {
            order: 1,
            revenue: amount * price
          };
        }
        return obj;
      }, {});
      let tempLabels = [];
      let tempOrders = [];
      let tempRevenues = [];
      for (let date in computeObject) {
        tempLabels.push(date);
        tempOrders.push(computeObject[date].order);
        tempRevenues.push(computeObject[date].revenue);
      }
      setLabels(tempLabels);
      setOrders(tempOrders);
      setRevenues(tempRevenues);
      console.log(computeObject);
    }).catch(err => {
      console.log(err);
    })
    console.log(Date.now())
  },[]);

  useEffect(()=>{
    console.log(labels);
    console.log(orders);
    console.log(revenues);
  })

  return (
    <View style={{padding: 12}}>
      <Text>Bezier Line Chart</Text>
      {labels.length && orders.length ? <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: orders
            }
          ]
        }}
        width={Dimensions.get("window").width - 24} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#ffffff"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      /> : null}
      {/* <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> */}
      {/* <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: revenues
            }
          ]
        }}
        width={Dimensions.get("window").width - 24} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#ffffff"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      /> */}
    </View>
  );
};

export default Statistics;
