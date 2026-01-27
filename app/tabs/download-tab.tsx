import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule from '../../modules/swarm-node/';

import styles from './styles';

import { createDocument } from 'react-native-saf-x';

export default function TabTwoScreen() {
  const [swarmHash, setSwarmHash] = useState(
    '1cd1e4fa753e6d9f23d343724a394feb855d05ad777aa1782531a7b3a98acc0b',
  );
  const [nodeStatus, setNodeStatus] = useState('Stopped');
  const [connectedPeers, setConnectedPeers] = useState(0);
  const [walletAddress, setWalletAddress] = useState('N/A');

  useEffect(() => {
    const onChangeSubscription = SwarmNodeModule.addListener(
      'onChange',
      (event) => {
        console.log('onChange event received:', event);
        if (event.walletAddress) {
          setWalletAddress(event.walletAddress);
        }
        if (event.status) {
          setNodeStatus(event.status);
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
    SwarmNodeModule.getConnectedPeers().then((peers: number) => {
      setConnectedPeers(peers);
    });
  };

  const handleDownload = () => {
    void SwarmNodeModule.download({ hash: swarmHash });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Node Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, styles.statusRunning]}>
              {nodeStatus}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Connected Peers:</Text>
            <Text style={styles.value}>{connectedPeers}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Wallet Information</Text>

          <Text style={styles.walletAddress}>{walletAddress}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Download by Swarm Hash</Text>

          <TextInput
            style={styles.input}
            value={swarmHash}
            onChangeText={setSwarmHash}
            placeholder="Swarm Hash"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadButtonText}>DOWNLOAD</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
