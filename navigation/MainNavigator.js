import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";

import theme from "../constants/theme";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const navigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

export default navigator;
