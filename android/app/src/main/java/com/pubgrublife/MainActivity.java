package com.pubgrublife;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // here
// react-native-splash-screen < 0.3.1

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    SplashScreen.show(this);
    return "PubGrubLife";
  }
}
