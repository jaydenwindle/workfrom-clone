import React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

import * as Animatable from "react-native-animatable";

import theme from "../constants/theme";

const FloatingButton = ({ label, onPress }) => (
  <Animatable.View
    style={styles.animatedContainer}
    useNativeDriver
    animation="fadeInUp"
  >
    <FAB
      style={styles.button}
      icon="map-marker-radius"
      label={label}
      onPress={onPress}
    />
  </Animatable.View>
);

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignSelf: "center",
    backgroundColor: theme.colors.primary
  }
});

export default FloatingButton;
