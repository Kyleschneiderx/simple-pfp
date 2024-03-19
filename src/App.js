import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './redux/store'; // Adjust the path as necessary
import AppNavigator from './navigation/AppNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;