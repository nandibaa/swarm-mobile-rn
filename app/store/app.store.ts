import { NodeStatus } from '@/constants/types';
import { create } from 'zustand/react';

export interface AppData {
  swarmHash: string;
  nodeStatus: NodeStatus;
  error: Error | null;
  walletAddress: string;
  connectedPeers: number;
  loading: boolean;

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

  updateHash: (hash: string) => set({ swarmHash: hash }),
  updatePeersCount: (connectedPeers: number) => set({ connectedPeers }),
  updateNodeStatus: (status: NodeStatus) => set({ nodeStatus: status }),
  updateWalletAddress: (walletAddress: string) => set({ walletAddress }),
  setError: (error: Error | null) => set({ error }),
  downloadStarted: () => set({ loading: true }),
  downloadFinished: () => set({ loading: false }),
}));

export default useAppStore;
