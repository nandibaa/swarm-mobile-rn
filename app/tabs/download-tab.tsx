import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule from '../../modules/swarm-node/';

import styles from './styles';

export default function TabTwoScreen() {
  const [swarmHash, setSwarmHash] = useState('');
  const [nodeStatus, setNodeStatus] = useState('Stopped');
  const [connectedPeers, setConnectedPeers] = useState(0);
  const [walletAddress, setWalletAddress] = useState('N/A');

  const handleDownload = () => {
    console.log('Downloading from Swarm Hash:', swarmHash);

    console.log('Downloading from Swarm Hash:', SwarmNodeModule.PI);
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
