import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type SwarmNodeModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
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
  data: Uint8Array;
};
