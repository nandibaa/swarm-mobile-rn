import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type SwarmNodeModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onDownloadFinished: (params: DownloadFinishedEventPayload) => void;
};

export type ChangeEventPayload = {
  value?: string;
  walletAddress?: string;
  status?: string;
};

export type DownloadFinishedEventPayload = {
  filename: string;
  // Base64-encoded from the Kotlin side because of this issue Uint8Array cannot be used
  // https://github.com/facebook/react-native/issues/39441#issuecomment-3180523965
  base64Data: string;
};

export type SwarmNodeViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export type SwarmNodeOptions = {
  password: string;
  rpcEndpoint: string;
};

export type DownloadOptions = {
  hash: string;
};

export type SwarmFile = {
  filename: string;
  data: string; // Base64 encoded string
};
