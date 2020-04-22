---------
safeCOVID
---------

This was written to help with adoption of contact tracing. See docs for more, published [here](https://www.safeCOVID.org)

It was written within two weeks, and there are no tests.
I wanted to test if Apple/Google would accept this, and in that, it failed. So I have not productionized it.
If you do use this code, see the wonderful libraries it relies on and feel free to adopt good ideas here. See website for mroe details of the whats and the whys.

We are in this together.


Deploy notes
------


For react-native-dotenv, update babel.config.js not .babelrc

Android studio seems to be complainy... yarn android works 100%. It's probably because I dont know which android studio warnings to ignore.

Expo has messed things up royally... need to do `expo publish` even though I do not use anything from them.... gaah
This might work too, but not tested yet - 
```
react-native bundle --minify --entry-file index.js --platform ios --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios
```
[This](https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729) might be helpful


For android
-----
Before releasing, build with `targetSdkVersion = 28`.
For some reason, my emulator doesn't work with that and needs 27

run this:
```
./gradlew bundleRelease
```

We get an output in `android/app/build/outputs/bundle/release/`
Submit this to google play store. Although, as of now, I have not been able to get a response from them, so we don't know if this works.


