package com.endava

import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceNameModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // The string name used to import this module in JS/TS
    override fun getName(): String {
        return "DeviceNameModule"
    }

    @ReactMethod
    fun getDeviceName(promise: Promise) {
        try {
            // 1. Try to get the user-customized device name (e.g., "Berat's Phone")
            var deviceName = Settings.Global.getString(
                reactApplicationContext.contentResolver, 
                "device_name"
            )

            // 2. Fallback to hardware Model name (e.g., "Galaxy S24 Ultra") if custom name is null
            if (deviceName.isNullOrBlank()) {
                deviceName = Build.MODEL
            }

            promise.resolve(deviceName)
        } catch (e: Exception) {
            promise.reject("ERR_GET_DEVICE_NAME", e.message)
        }
    }
}
