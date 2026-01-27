package expo.modules.swarmnode;

public interface SwarmNodeListener {
    void onNodeInfoChanged(NodeInfo nodeInfo);
    void onDownloadFinished(String filename, byte[] data);
}