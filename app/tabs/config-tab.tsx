import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule from '../../modules/swarm-node';

import styles from './styles';

const STORAGE_KEYS = {
  PASSWORD: 'swarm_node_password',
  RPC_ENDPOINT: 'swarm_node_rpc_endpoint',
};

export default function TabOneScreen() {
  const [password, setPassword] = useState('');
  const [rpcEndpoint, setRpcEndpoint] = useState(
    'https://xdai.fairdatasociety.org',
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const savedPassword = await SecureStore.getItemAsync(
          STORAGE_KEYS.PASSWORD,
        );
        const savedRpcEndpoint = await SecureStore.getItemAsync(
          STORAGE_KEYS.RPC_ENDPOINT,
        );

        if (savedPassword) {
          setPassword(savedPassword);
        }
        if (savedRpcEndpoint) {
          setRpcEndpoint(savedRpcEndpoint);
        }
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    };

    loadSavedConfig();
  }, []);

  useEffect(() => {
    SwarmNodeModule.removeAllListeners('onChange');

    const subscription = SwarmNodeModule.addListener('onChange', (event) => {
      console.log('SwarmNodeModule onChange event:', event);
    });

    return () => subscription.remove();
  }, []);

  const handleStartNode = async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.PASSWORD, password);
      await SecureStore.setItemAsync(STORAGE_KEYS.RPC_ENDPOINT, rpcEndpoint);
    } catch (error) {
      console.error('Error saving configuration:', error);
    }

    void SwarmNodeModule.startNode({ password, rpcEndpoint });
    router.push('/tabs/download-tab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Node Configuration</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter password"
              placeholderTextColor="#999"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#666"
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>RPC Endpoint</Text>
          <TextInput
            style={styles.input}
            value={rpcEndpoint}
            onChangeText={setRpcEndpoint}
            placeholder="Enter RPC endpoint"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartNode}>
          <Ionicons
            name="play"
            size={28}
            color="#fff"
            style={styles.playIcon}
          />
          <Text style={styles.startButtonText}>START NODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
