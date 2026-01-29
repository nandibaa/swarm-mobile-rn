import { NodeStatus } from '@/constants/types';
import { create } from 'zustand/react';

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

const defaultRpcEndpoint = 'https://xdai.fairdatasociety.org';

export const STORAGE_KEYS = {
  PASSWORD: 'swarm_node_password',
  RPC_ENDPOINT: 'swarm_node_rpc_endpoint',
};

export interface AppData {
  swarmHash: string;
  nodeStatus: NodeStatus;
  error: Error | null;
  walletAddress: string;
  connectedPeers: number;
  loading: boolean;

  getPassword: () => string;
  setPassword: (password: string) => void;
  getRpcEndpoint: () => string;
  setRpcEndpoint: (endpoint: string) => void;

  updateHash: (name: string) => void;
  updatePeersCount: (connectedPeers: number) => void;
  updateNodeStatus: (status: NodeStatus) => void;
  updateWalletAddress: (walletAddress: string) => void;
  setError: (error: Error | null) => void;
  downloadStarted: () => void;
  downloadFinished: () => void;
}

export const useAppStore = create<AppData>((set) => ({
  swarmHash: '',
  nodeStatus: NodeStatus.Stopped,
  error: null,
  walletAddress: '',
  connectedPeers: 0,
  loading: false,

  getPassword: () => storage.getString(STORAGE_KEYS.PASSWORD) || '',
  setPassword: (password: string) =>
    storage.set(STORAGE_KEYS.PASSWORD, password),
  getRpcEndpoint: () =>
    storage.getString(STORAGE_KEYS.RPC_ENDPOINT) || defaultRpcEndpoint,
  setRpcEndpoint: (endpoint: string) =>
    storage.set(STORAGE_KEYS.RPC_ENDPOINT, endpoint),

  updateHash: (hash: string) => set({ swarmHash: hash }),
  updatePeersCount: (connectedPeers: number) => set({ connectedPeers }),
  updateNodeStatus: (status: NodeStatus) => set({ nodeStatus: status }),
  updateWalletAddress: (walletAddress: string) => set({ walletAddress }),
  setError: (error: Error | null) => set({ error }),
  downloadStarted: () => set({ loading: true }),
  downloadFinished: () => set({ loading: false }),
}));

export default useAppStore;
