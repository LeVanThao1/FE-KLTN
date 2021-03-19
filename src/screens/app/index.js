import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MobXProviderContext, useObserver, Provider} from 'mobx-react';
import {DrawerNavigator, AuthStack} from '../../navigation';
// import {stores} from '../../store';
import {Root} from 'native-base';
const App = () => {
  // return useObserver(() => {
  //   const {
  //     stores: {
  //       auth: {isAuth},
  //     },
  //   } = useContext(MobXProviderContext);

  return (
    <NavigationContainer>
      {true ? <AuthStack /> : <DrawerNavigator />}
    </NavigationContainer>
  );
  // });
};

// const AppProvider = () => {
//   <Root>
//     <Provider stores={stores}>
//       <App />
//     </Provider>
//     ;
//   </Root>;
// };

export default App;
