import { requireNativeView } from 'expo';
import * as React from 'react';

import { SwarmNodeViewProps } from './SwarmNode.types';

const NativeView: React.ComponentType<SwarmNodeViewProps> =
  requireNativeView('SwarmNode');

export default function SwarmNodeView(props: SwarmNodeViewProps) {
  return <NativeView {...props} />;
}
