import { NativeModule, requireNativeModule } from 'expo';

import {
  DownloadOptions,
  SwarmFile,
  SwarmNodeModuleEvents,
  SwarmNodeOptions,
} from './SwarmNode.types';

declare class SwarmNodeModule extends NativeModule<SwarmNodeModuleEvents> {
  startNode(nodeOptions: SwarmNodeOptions): Promise<string>;
  stopNode(): Promise<string>;
  getConnectedPeers(): Promise<number>;
  download(downloadOptions: DownloadOptions): Promise<SwarmFile>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<SwarmNodeModule>('SwarmNode');
