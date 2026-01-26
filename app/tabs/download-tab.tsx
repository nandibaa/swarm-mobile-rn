import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule, { SwarmFile } from '../../modules/swarm-node/';

import styles from './styles';

export default function TabTwoScreen() {
  const [swarmHash, setSwarmHash] = useState('');
  const [nodeStatus, setNodeStatus] = useState('Stopped');
  const [connectedPeers, setConnectedPeers] = useState(0);
  const [walletAddress, setWalletAddress] = useState('N/A');

  useEffect(() => {
    handleQueryPeers();
    const interval = connectedPeers < 100 ? 1000 : 5000;
    const schedule = setInterval(handleQueryPeers, interval);
    return () => clearInterval(schedule);
  }, [connectedPeers]);

  const handleQueryPeers = () => {
    console.log('Querying connected peers...');
    SwarmNodeModule.getConnectedPeers().then((peers: number) => {
      console.log('Connected peers:', peers);
      setConnectedPeers(peers);
    });
  };

  const handleDownload = () => {
    console.log('Downloading from Swarm Hash:', swarmHash);
    SwarmNodeModule.download({ hash: swarmHash }).then((file: SwarmFile) => {
      console.log('Downloaded file:', file);
    });
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
