import { create } from "zustand";

type BookingStore = {
  // Finalized Bookings
  deskSlot: number | null;
  deskFloor: number | null;
  parkingSlot: number | null;
  parkingFloor: number | null;

  setDeskSlot: (value: number | null) => void;
  setDeskFloor: (value: number | null) => void;
  setParkingSlot: (value: number | null) => void;
  setParkingFloor: (value: number | null) => void;

  setDeskBooking: (floor: number | null, slot: number | null) => void;
  setParkingBooking: (floor: number | null, slot: number | null) => void;

  // Active Draft Selections (UI State)
  draftDeskFloor: number;
  draftDeskSlot: number | null;
  draftParkingFloor: number;
  draftParkingSlot: number | null;

  setDraftDesk: (floor: number, slot: number | null) => void;
  setDraftParking: (floor: number, slot: number | null) => void;

  clearDraftDesk: () => void;
  clearDraftParking: () => void;
  reset: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  // Finalized Bookings
  deskSlot: null,
  deskFloor: null,
  parkingSlot: null,
  parkingFloor: null,

  setDeskSlot: (value) => set({ deskSlot: value }),
  setDeskFloor: (value) => set({ deskFloor: value }),

  setParkingSlot: (value) => set({ parkingSlot: value }),
  setParkingFloor: (value) => set({ parkingFloor: value }),

  setDeskBooking: (floor, slot) =>
    set({
      deskFloor: floor,
      deskSlot: slot,
    }),

  setParkingBooking: (floor, slot) =>
    set({
      parkingFloor: floor,
      parkingSlot: slot,
    }),

  // Draft Defaults
  draftDeskFloor: 5,
  draftDeskSlot: null,
  draftParkingFloor: 1,
  draftParkingSlot: null,

  setDraftDesk: (floor, slot) =>
    set({
      draftDeskFloor: floor,
      draftDeskSlot: slot,
    }),

  setDraftParking: (floor, slot) =>
    set({
      draftParkingFloor: floor,
      draftParkingSlot: slot,
    }),

  clearDraftDesk: () =>
    set({
      draftDeskFloor: 5,
      draftDeskSlot: null,
    }),

  clearDraftParking: () =>
    set({
      draftParkingFloor: 1,
      draftParkingSlot: null,
    }),

  reset: () =>
    set({
      deskSlot: null,
      deskFloor: null,
      parkingSlot: null,
      parkingFloor: null,
      draftDeskFloor: 5,
      draftDeskSlot: null,
      draftParkingFloor: 1,
      draftParkingSlot: null,
    }),
}));