import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';

const Toast = ({visible, message}) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      80,
    );
    return null;
  }
  return null;
};

const App = () => {
  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  return (
    <View style={styles.container}>
      <Toast visible={visibleToast} message="Exampsssle" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
});

export default App;
