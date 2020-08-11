/** Our main RN-file where we handle our routes */
import * as React from 'react';

import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';

import { ApiProvider, AuthProvider, DateProvider } from './src/services';

export default function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <DateProvider>
          <AppNavigator />
        </DateProvider>
      </ApiProvider>
    </AuthProvider>
  );
}
