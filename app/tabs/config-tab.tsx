import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule from '../../modules/swarm-node';

import useAppStore from '@/app/store/app.store';
import styles from './styles';

const STORAGE_KEYS = {
  PASSWORD: 'swarm_node_password',
  RPC_ENDPOINT: 'swarm_node_rpc_endpoint',
};

export default function TabOneScreen() {
  const { getPassword, setPassword, getRpcEndpoint, setRpcEndpoint } =
    useAppStore();

  const [password, setPasswordLocal] = useState(getPassword());
  const [rpcEndpoint, setRpcEndpointLocal] = useState(getRpcEndpoint());

  const [showPassword, setShowPassword] = useState(false);

  const handleStartNode = async () => {
    setPassword(password);
    setRpcEndpoint(rpcEndpoint);

    void SwarmNodeModule.startNode({
      password: password,
      rpcEndpoint: rpcEndpoint,
    });
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
              onChangeText={setPasswordLocal}
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
            onChangeText={setRpcEndpointLocal}
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
