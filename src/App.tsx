import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigator from '@/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'System': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn('Error preparing app:', e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
