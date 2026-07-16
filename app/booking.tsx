import { IconSymbol } from '@/components/ui/icon-symbol';
import { manageWeekdayNotifications } from '@/services/notifications';
import { useBookingStore } from '@/stores/useBookingStore';
import React from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type BookingType = 'desk' | 'parking';

export default function BookingScreen() {
  const [type, setType] = React.useState<BookingType>('desk');

  // 1. Get entire synced state from Zustand
  const {
    // Confirmed bookings
    deskFloor,
    deskSlot,
    parkingFloor,
    parkingSlot,
    setDeskBooking,
    setParkingBooking,

    // Draft selections
    draftDeskFloor,
    draftDeskSlot,
    draftParkingFloor,
    draftParkingSlot,
    setDraftDesk,
    setDraftParking,
  } = useBookingStore();

  // 2. Map current display values dynamically based on selected tab ('desk' vs 'parking')
  const selectedFloor = type === 'desk' ? draftDeskFloor : draftParkingFloor;
  const selectedSlot = type === 'desk' ? draftDeskSlot : draftParkingSlot;

  // Floor configurations based on active type
  const floorsForType = type === 'desk' ? [5, 6, 7] : [1, 2];

  // Handle floor shifts (updates draft state in Zustand)
  const handleFloorChange = (floor: number) => {
    if (type === 'desk') {
      setDraftDesk(floor, null); // Clear slot on floor change
    } else {
      setDraftParking(floor, null);
    }
  };

  // Handle slot selections
  const handleSlotSelect = (slot: number) => {
    if (type === 'desk') {
      setDraftDesk(selectedFloor, slot);
    } else {
      setDraftParking(selectedFloor, slot);
    }
  };

  // Generate Slots dynamically based on the current floor selection
  const getSlots = () => {
    if (type === 'desk') {
      if (selectedFloor === 5) return Array.from({ length: 10 }, (_, i) => 50 + i);
      if (selectedFloor === 6) return Array.from({ length: 10 }, (_, i) => 60 + i);
      if (selectedFloor === 7) return Array.from({ length: 10 }, (_, i) => 70 + i);
    } else if (type === 'parking') {
      if (selectedFloor === 1) return Array.from({ length: 20 }, (_, i) => 1 + i);
      if (selectedFloor === 2) return Array.from({ length: 20 }, (_, i) => 21 + i);
    }
    return [];
  };

  const slots = getSlots();

  // Mock static reserved positions
  const isReserved = (slot: number) => {
    const staticReservedNumbers = [52, 55, 61, 68, 73, 5, 12, 18, 24, 33, 39];
    return staticReservedNumbers.includes(slot);
  };

  // Handle final reservation execution
  const handleConfirmBooking = async () => {
    if (selectedSlot === null) {
      const msg = 'Please select an available slot before confirming.';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Selection Required', msg);
      }
      return;
    }

    // 1. Commit draft selections to your confirmed bookings
    if (type === 'desk') {
      setDeskBooking(selectedFloor, selectedSlot);
    } else {
      setParkingBooking(selectedFloor, selectedSlot);
    }

    // 2. Refresh notification schedules
    try {
      await manageWeekdayNotifications();
    } catch (e) {
      console.warn("Could not schedule notifications:", e);
    }

    const receipt = `Reserved ${type === 'desk' ? `Workstation Desk #${selectedSlot}` : `Parking Space #${selectedSlot}`} on Level ${selectedFloor}.`;

    if (Platform.OS === 'web') {
      window.alert(`Booking Confirmed! 🎉\n\n${receipt}`);
    } else {
      Alert.alert('Booking Confirmed! 🎉', receipt);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-darkBg px-6 pt-12 pb-6">

      {/* 1. Header Frame */}
      <View className="mb-6">
        <Text className="text-slate-400 dark:text-mutedText text-[10px] uppercase font-black tracking-widest">
          Workspace Access
        </Text>
        <Text className="text-slate-900 dark:text-lightText text-2xl font-black mt-0.5">
          Reservations
        </Text>
        {/* Current confirmed bookings summary */}
        <View className="mt-3">
          <Text className="text-slate-700 dark:text-mutedText text-sm">
            {deskSlot !== null
              ? `Booked Desk: Floor ${deskFloor} • Workstation #${deskSlot}`
              : 'Booked Desk: —'}
          </Text>

          <Text className="text-slate-700 dark:text-mutedText text-sm mt-1">
            {parkingSlot !== null
              ? `Booked Parking: Level ${parkingFloor} • Space #${parkingSlot}`
              : 'Booked Parking: —'}
          </Text>
        </View>
        <Text className="text-slate-500 dark:text-mutedText text-xs mt-1">
          Lock in your dedicated workstation or parking spot for tomorrow.
        </Text>
      </View>

      {/* 2. Mode Selector Track */}
      <View className="flex-row bg-slate-100 dark:bg-cardBg p-1.5 rounded-2xl mb-6 border border-slate-200/30 dark:border-slate-800/40">
        <TouchableOpacity
          onPress={() => setType('desk')}
          className={`flex-1 flex-row justify-center items-center py-3 rounded-xl ${type === 'desk' ? 'bg-primary shadow-sm' : ''
            }`}
        >
          <IconSymbol name="monitor.fill" size={16} color={type === 'desk' ? '#fff' : '#64748b'} />
          <Text className={`font-black text-xs ml-2 ${type === 'desk' ? 'text-white' : 'text-slate-600 dark:text-mutedText'}`}>
            Workstation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('parking')}
          className={`flex-1 flex-row justify-center items-center py-3 rounded-xl ${type === 'parking' ? 'bg-primary shadow-sm' : ''
            }`}
        >
          <IconSymbol name="car.fill" size={16} color={type === 'parking' ? '#fff' : '#64748b'} />
          <Text className={`font-black text-xs ml-2 ${type === 'parking' ? 'text-white' : 'text-slate-600 dark:text-mutedText'}`}>
            Parking Space
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

        {/* 3. Level/Floor Selector Segment */}
        <Text className="text-slate-400 dark:text-mutedText uppercase text-[10px] font-black tracking-widest mb-3">
          Select {type === 'desk' ? 'Office Floor' : 'Parking Level'}
        </Text>
        <View className="flex-row gap-3 mb-6">
          {floorsForType.map((floor) => (
            <TouchableOpacity
              key={floor}
              onPress={() => handleFloorChange(floor)}
              className={`flex-1 py-3.5 rounded-2xl border items-center justify-center ${selectedFloor === floor
                ? 'bg-primary/10 border-primary'
                : 'bg-slate-50 dark:bg-cardBg border-slate-200/40 dark:border-slate-800'
                }`}
            >
              <Text className={`text-xs font-black ${selectedFloor === floor ? 'text-primary' : 'text-slate-600 dark:text-lightText'
                }`}>
                {type === 'desk' ? `Floor ${floor}` : `Level ${floor}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Interactive Grid Selection */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-slate-400 dark:text-mutedText uppercase text-[10px] font-black tracking-widest">
            Interactive Layout View
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-row items-center gap-1">
              <View className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <Text className="text-[9px] text-slate-500 font-bold">Free</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <Text className="text-[9px] text-slate-500 font-bold">Full</Text>
            </View>
          </View>
        </View>

        {/* Map Grid Container */}
        <View className="bg-slate-50 dark:bg-cardBg/30 p-4 rounded-3xl border border-slate-200/40 dark:border-slate-800/80 mb-8">
          <View className="flex-row flex-wrap justify-start gap-2.5">
            {slots.map((slot) => {
              const occupied = isReserved(slot);
              const isSelected = selectedSlot === slot;

              return (
                <TouchableOpacity
                  key={slot}
                  disabled={occupied}
                  onPress={() => handleSlotSelect(slot)}
                  className={`w-[17%] min-h-16 aspect-square rounded-xl items-center justify-center border transition-all ${occupied
                    ? 'bg-red-500/10 border-red-500/20'
                    : isSelected
                      ? 'bg-primary border-primary shadow-sm shadow-primary/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800'
                    }`}
                >
                  <IconSymbol
                    name={type === 'desk' ? "monitor.fill" : "car.fill"}
                    size={12}
                    color={isSelected ? '#fff' : occupied ? '#ef4444' : '#94a3b8'}
                  />
                  <Text className={`text-[10px] font-black mt-1 ${isSelected ? 'text-white' : occupied ? 'text-red-500' : 'text-slate-800 dark:text-lightText'
                    }`}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      <View className="pt-2 px-6 bg-white dark:bg-darkBg">
        <TouchableOpacity
          onPress={handleConfirmBooking}
          className="bg-primary w-full py-4 rounded-2xl items-center active:opacity-95 shadow-lg shadow-primary/25"
        >
          <Text className="text-white font-black text-sm">
            Confirm Selection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}