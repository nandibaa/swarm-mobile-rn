import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './SwarmNode.types';

type SwarmNodeModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class SwarmNodeModule extends NativeModule<SwarmNodeModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(SwarmNodeModule, 'SwarmNodeModule');
