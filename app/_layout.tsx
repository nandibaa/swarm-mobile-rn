import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

import SwarmNodeModule from '@/modules/swarm-node';
import { Alert } from 'react-native';
import { createDocument } from 'react-native-saf-x';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'tabs',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import useAppStore from '@/app/store/app.store';
import { NodeStatus } from '@/constants/types';

export default function RootLayout() {
  const {
    walletAddress,
    nodeStatus,
    connectedPeers,
    updateWalletAddress,
    updatePeersCount,
    updateNodeStatus,
  } = useAppStore();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    SwarmNodeModule.removeAllListeners('onChange');
    SwarmNodeModule.removeAllListeners('onDownloadFinished');

    const onChangeSubscription = SwarmNodeModule.addListener(
      'onChange',
      (event) => {
        if (event.walletAddress) {
          updateWalletAddress(event.walletAddress);
        }

        if (
          event.status &&
          Object.values(NodeStatus).includes(event.status as NodeStatus)
        ) {
          updateNodeStatus(NodeStatus[event.status as keyof typeof NodeStatus]);
        }
      },
    );

    const onDownloadFinishedSubscription = SwarmNodeModule.addListener(
      'onDownloadFinished',
      async (event) => {
        if (event.filename && event.base64Data) {
          try {
            const uri = await createDocument(event.base64Data, {
              mimeType: 'application/octet-stream',
              encoding: 'base64',
              initialName: event.filename,
            });

            if (!uri) {
              console.log('User backed out without saving');
              return;
            }

            console.log('File saved successfully to:', uri.uri);
            Alert.alert('Success', `File saved: ${uri.uri}`);
          } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Error', 'Failed to save file');
          }
        } else {
          console.warn('Invalid download finished event data');
        }
      },
    );

    return () => {
      onChangeSubscription.remove();
      onDownloadFinishedSubscription.remove();
    };
  }, []);

  useEffect(() => {
    handleQueryPeers();
    const interval = connectedPeers < 100 ? 1000 : 5000;
    const schedule = setInterval(handleQueryPeers, interval);
    return () => clearInterval(schedule);
  }, [connectedPeers]);

  const handleQueryPeers = () => {
    SwarmNodeModule.getConnectedPeers().then((peersCount) => {
      updatePeersCount(peersCount);
    });
  };

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
