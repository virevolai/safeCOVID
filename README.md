

On eject we got
```
(atelier_elt) panoramix:safeCOVID saurabh$ expo eject
Your git working tree is clean
To revert the changes after this command completes, you can run the following:
  git clean --force && git reset --hard

Now we need to know your iOS bundle identifier (​https://expo.fyi/bundle-identifier​). You can change this in the future if you need to.
? What would you like your bundle identifier to be? org.virevol.virevolai.safecovid

Now we need to know your Android package (​https://expo.fyi/android-package​). You can change this in the future if you need to.
? What would you like your package to be named? org.virevol.virevolai.safecovid

✔ App configuration (app.json) updated.
✔ Created native project directories (./ios and ./android) and updated .gitignore.
✔ Updated package.json and added index.js entry point for iOS and Android.
✔ Installed JavaScript dependencies.

⚠️  iOS configuration applied with warnings that should be fixed:
- supportsTablet: You will need to configure this in the "General" tab for your project target in Xcode.
- icon: This is the image that your app uses on your home screen, you will need to configure it manually.
- splash: This is the image that your app uses on the loading screen, we recommend installing and using expo-splash-screen. Details. (​https://github.com/expo/expo/blob/master/packages/expo-splash-screen/README.md​)

⚠️  Android configuration applied with warnings that should be fixed:
- splash: This is the image that your app uses on the loading screen, we recommend installing and using expo-splash-screen. Details. (​https://github.com/expo/expo/blob/master/packages/expo-splash-screen/README.md​)
- icon: This is the image that your app uses on your home screen, you will need to configure it manually.

✔ Installed pods and initialized Xcode workspace.

➡️  Next steps
- 👆 Review the logs above and look for any warnings (⚠️ ) that might need follow-up.
- 💡 You may want to run npx @react-native-community/cli doctor to help install any tools that your app may need to run your native projects.
- 🔑 Download your Android keystore (if you're not sure if you need to, just run the command and see): expo fetch:android:keystore

☑️  When you are ready to run your project
To compile and run your project, execute one of the following commands:
- yarn ios
- yarn android
- yarn web

```

For react-native-dotenv, update babel.config.js not .babelrc

Android studio seems to be complainy... yarn android works 100%. It's probably because I dont know which android studio warnings to ignore.

For android, run this:
```
./gradlew bundleRelease
```

We get an output in `android/app/build/outputs/bundle/release/`

