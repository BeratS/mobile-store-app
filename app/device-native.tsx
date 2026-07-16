import React, { useEffect, useState } from 'react';
import { NativeModules, Platform, Text, View } from 'react-native';

// Safely extract our custom Android native module
const { DeviceNameModule } = NativeModules;

export default function DeviceNative() {
  const [deviceName, setDeviceName] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchDeviceName() {
      if (Platform.OS === 'android' && DeviceNameModule) {
        try {
          const name = await DeviceNameModule.getDeviceName();
          setDeviceName(name);
        } catch (error) {
          console.error("Failed to retrieve device name:", error);
          setDeviceName('Error fetching name');
        }
      } else {
        setDeviceName(`${Platform.OS} device`);
      }
    }

    fetchDeviceName();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
      <Text style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>
        Device Name
      </Text>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 8 }}>
        {deviceName}
      </Text>
    </View>
  );
}
