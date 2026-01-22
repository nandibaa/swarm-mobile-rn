import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';

import SwarmNodeModule from '../../modules/swarm-node';

import styles from './styles';

export default function TabOneScreen() {
  const [password, setPassword] = useState('');
  const [rpcEndpoint, setRpcEndpoint] = useState(
    'https://xdai.fairdatasociety.org',
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleStartNode = () => {
    console.log('Starting node with:', { password, rpcEndpoint });
    // TODO: Implement download logic
    console.log(SwarmNodeModule.hello());
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
