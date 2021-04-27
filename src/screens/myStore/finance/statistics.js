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

  const [data, setData] = useState([]);

  useEffect(()=>{
    queryData(GET_SUB_ORDERS_STORE).then(({data: {subOrdersByStore}}) => {
      let subOrders = subOrdersByStore.map(({createdAt, detail}) => ({createdAt, ...detail}));
      let computeObject = subOrders.reduce((obj, subOrder) => {
        
      }, {});
      console.log(computeObject);
    }).catch(err => {
      console.log(err);
    })
    console.log(Date.now())
  },[]);

  return (
    <View style={{padding: 12}}>
      <Text>Bezier Line Chart</Text>
      <LineChart
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
      />
    </View>
  );
};

export default Statistics;
