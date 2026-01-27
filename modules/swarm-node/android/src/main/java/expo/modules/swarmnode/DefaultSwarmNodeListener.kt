package expo.modules.swarmnode

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.util.Base64


class DefaultSwarmNodeListener(private val module: SwarmNodeModule) : SwarmNodeListener {
    override fun onNodeInfoChanged(nodeInfo: NodeInfo) {
        android.util.Log.d("SwarmNode", "Node info changed: ${nodeInfo.walletAddress()}, ${nodeInfo.status()}")
        module.sendEvent("onChange", mapOf(
            "walletAddress" to nodeInfo.walletAddress(),
            "status" to nodeInfo.status().toString()
        ))
    }

    override fun onDownloadFinished(filename: String, data: ByteArray) {
        android.util.Log.d("SwarmNode", "Download finished: $filename, size: ${data.size} bytes")
        val base64Data = Base64.encodeToString(data, Base64.DEFAULT)
        module.sendEvent("onDownloadFinished", mapOf(
            "filename" to filename,
            "base64Data" to base64Data
        ))
    }
}
