import { NativeModule, registerWebModule } from 'expo';

import {
  ChangeEventPayload,
  DownloadOptions,
  SwarmFile,
  SwarmNodeOptions,
} from './SwarmNode.types';

type SwarmNodeModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

class SwarmNodeModule extends NativeModule<SwarmNodeModuleEvents> {
  startNode(nodeOptions: SwarmNodeOptions): Promise<string> {
    console.log('Hello from web! Options:', nodeOptions);
    return Promise.resolve('Hello world! 👋');
  }

  stopNode(): Promise<string> {
    console.log('Stopping node (web mock)');
    return Promise.resolve('Node stopped (web mock)');
  }

  getConnectedPeers(): Promise<number> {
    console.log('Getting connected peers (web mock)');
    return Promise.resolve(5); // Mocked number of connected peers
  }

  download(downloadOptions: DownloadOptions): Promise<SwarmFile> {
    return Promise.resolve({
      filename: 'example.txt',
      data: new Uint8Array([
        72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33,
      ]), // "Hello, World!"
    });
  }
}

export default registerWebModule(SwarmNodeModule, 'SwarmNodeModule');
