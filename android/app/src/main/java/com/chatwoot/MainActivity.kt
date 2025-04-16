package com.callpicker.chat

import android.os.Build
import android.content.Intent
import android.os.Bundle
import android.os.PowerManager
import android.provider.Settings
import android.net.Uri
import android.app.Activity
import android.content.Context

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme)
    super.onCreate(savedInstanceState)

    requestBatteryOptimizationExemption()  // Add this line to request exemption
  }

  /**
    * Request battery optimization exemption from the user.
    */
  private fun requestBatteryOptimizationExemption() {
    val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
    val packageName = packageName
    val prefs = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
    val hasAskedBefore = prefs.getBoolean("hasAskedBatteryOptimization", false)

    // Check if the app is ignoring battery optimizations
    if (!pm.isIgnoringBatteryOptimizations(packageName) && !hasAskedBefore) {
      val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
      intent.data = Uri.parse("package:$packageName")
      startActivity(intent)

      // Save that we have asked the user
      prefs.edit().putBoolean("hasAskedBatteryOptimization", true).apply()
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
