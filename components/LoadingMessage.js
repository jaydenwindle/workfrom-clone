import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { View, Text } from "react-native";

import * as Animatable from "react-native-animatable";

import theme from "../constants/theme";

const LoadingMessage = ({ visible, message }) =>
  visible && (
    <Animatable.View
      style={styles.animatedContainer}
      useNativeDriver
      animation="fadeInDown"
      duration={200}
    >
      <View style={styles.container}>
        <ActivityIndicator color={theme.colors.primary} />
        <Text style={styles.loadingMessage}>{message}</Text>
      </View>
    </Animatable.View>
  );

const styles = StyleSheet.create({
  animatedContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: "row"
  },
  loadingMessage: { color: theme.colors.white, marginLeft: 10 }
});

export default LoadingMessage;
