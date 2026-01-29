import { Text, View } from '@/components/Themed';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

import useAppStore from '@/app/store/app.store';
import SwarmNodeModule from '@/modules/swarm-node';

export default function TabTwoScreen() {
  const {
    swarmHash,
    nodeStatus,
    walletAddress,
    connectedPeers,
    loading,
    updateHash,
    downloadStarted,
    downloadFinished,
  } = useAppStore();

  const handleDownload = async () => {
    downloadStarted();
    await SwarmNodeModule.download({ hash: swarmHash });
    downloadFinished();
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
            onChangeText={updateHash}
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
