package expo.modules.swarmnode

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import java.net.URL
import android.content.Context

import mobile.Mobile;
import mobile.MobileNode;
import mobile.MobileNodeOptions;

 data class SwarmNodeOptions(
  @Field
  val password: String,
  @Field
  val rpcEndpoint: String,
) : Record

data class DownloadOptions(
  @Field
  val hash: String,
) : Record

data class SwarmFile(
  @Field
  val filename: String,

  @Field
  val data: ByteArray,
) : Record

 class SwarmNodeModule : Module() {
  private var swarmNode: SwarmNode? = null

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('SwarmNode')` in JavaScript.
    Name("SwarmNode")

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    AsyncFunction("startNode") { nodeOptions: SwarmNodeOptions ->
      try {
        val context = appContext.reactContext ?: throw RuntimeException("React context is null")

        val dataDir = context.filesDir.absolutePath

        if (swarmNode == null) {
          // println("Starting Swarm Node with options : password=${nodeOptions.password}, rpcEndpoint=${nodeOptions.rpcEndpoint}")
          swarmNode = SwarmNode(dataDir, nodeOptions.password, nodeOptions.rpcEndpoint)
          swarmNode?.start()
        }
        
        if (swarmNode?.isRunning == true) {
          return@AsyncFunction
        }

        swarmNode?.start()
              
        return@AsyncFunction
      } catch (e: Exception) {
        throw RuntimeException("Failed to start node: ${e.message}", e)
      }
    }

    AsyncFunction("getConnectedPeers") {
      swarmNode?.getConnectedPeers()
    }

     AsyncFunction("stopNode") {
      swarmNode?.stopNode()
    }

    AsyncFunction("download") { downloadOptions: DownloadOptions ->
      SwarmFile(
        filename = "sample.txt",
        data = byteArrayOf(72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33)
      )
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(SwarmNodeView::class) {
      // Defines a setter for the `url` prop.
      Prop("url") { view: SwarmNodeView, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      // Defines an event that the view can send to JavaScript.
      Events("onLoad")
    }
  }
}
