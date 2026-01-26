import * as React from 'react';

import { SwarmNodeViewProps } from './SwarmNode.types';

export default function SwarmNodeView(props: SwarmNodeViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
