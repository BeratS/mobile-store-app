import { render } from "@testing-library/react-native";
import React from "react";
import StoreScreen from "../store";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => ({
    items: [],
    addItem: jest.fn(),
    total: jest.fn(() => 0),
    clear: jest.fn(),
  }),
}));

describe("StoreScreen", () => {
  test("renders the title", async () => {
    const { getByText } = await render(<StoreScreen />);

    expect(getByText("Endava Store")).toBeTruthy();
  });
});
