# Swarm Mobile React Native

This repository is focusing to implement a client running [bee-lite-java](https://github.com/Solar-Punk-Ltd/bee-lite-java) client
from a React Native application that can able to connect and download from [Swarm network](https://docs.ethswarm.org/)

## Development for Android platform

### Prerequisites

- Node 24 or higher
- Java 17 or higher
- VS Code
- Android Studio
- Android NDK
- bee-lite-java binary as mobile.aar file - check linked repository for further info how to obtain it

### The Concept

React Native app using the [SwarmNodeModule](modules/swarm-node/src/SwarmNodeModule.ts) interface to communicate with Swarm and implement the [config-tab.tsx](app/tabs/config-tab.tsx) and [download-tab.tsx](app/tabs/download-tab.tsx) functionalities.
SwarmNodeModule interface has 3 implementations: TypeScript (for web), Kotlin (for Android), Swift (for iOS) - this project focus on the Kotlin implementation [SwarmNodeModule.kt](modules/swarm-node/android/src/main/java/expo/modules/swarmnode/SwarmNodeModule.kt).
Since there is a working Java implementation for [Android](https://github.com/Solar-Punk-Ltd/swarm-mobile-android) almost the same classes can be used and called from Kotlin code (please read restrictions below).
BUT the communication between React Native and the Kotlin module is different in this repository.
[DefaultSwarmNodeListener.kt](modules/swarm-node/android/src/main/java/expo/modules/swarmnode/DefaultSwarmNodeListener.kt) implements the callback methods for [SwarmNodeListener](modules/swarm-node/android/src/main/java/expo/modules/swarmnode/SwarmNodeListener.java) interface and it posts (onChange, onDownloadFinished) events when SwarmClient completes its tasks.
The React Native [subscribes](app/_layout.tsx#L61) for these events and the async functionality works nice without blocking the main thread while waiting for a download for instance.

### Expo

The repository using [Expo](https://expo.dev/go) and [Expo Modules](https://docs.expo.dev/modules/overview/).
This allows us to use Kotlin implementation and communicate with the `bee-lite-java` binary through JNI bridge.

### Build and test on your local

Start with `npm i` to fetch all dependencies.

There are some scripts in package.json like `start` , `android` or `android-no-cache` .
For Android just simply run `npm run android` but in some cases if you are having caching issues run `npm run android-no-cache` .
This mainly can happen if Kotlin code changes and gradle does not recognize it. You can manually run it with script if you want:
`npx expo prebuild --clean --platform android` .

### Troubleshooting

Since there a lot of languages and interfaces working together in this project different tools required to troubleshoot issues.
For the React Native app, console.log statement can be used easily to track down issues while Kotlin and Java logging and error logs can be tracked in Android Studio LogCat.
Select the connected device and filter for the application package to get rid of the noise in the log.
In this project package is `com.solarpunk.swarmmobilern` - it configured in [app.json](app.json)

### Expo modules api

For [reference](https://docs.expo.dev/modules/module-api) please check out how async calls and event handling works.

## Restrictions

- Since this is not a full TypeScript, Kotlin, Java app, code completion only work for TypeScript for the React Native part.
- Unfortunately in the SwarmFile Dto we Cannot use Uint8Array with React Native because of this [issue](https://github.com/facebook/react-native/issues/39441#issuecomment-3180523965)
