import React from "react";
import { ToggleButton } from "react-native-paper";
import { StyleSheet } from "react-native";

import * as Animatable from "react-native-animatable";

import theme from "../constants/theme";

const SearchToggleHeader = ({ value, onValueChange, visible }) =>
  visible && (
    <Animatable.View useNativeDriver animation="fadeInRight" duration={200}>
      <ToggleButton.Row
        style={styles.row}
        onValueChange={onValueChange}
        value={value}
      >
        <ToggleButton
          icon="map-search"
          value="map"
          color={value === "map" ? theme.colors.primary : theme.colors.white}
          style={[
            styles.mapToggle,
            value === "map" && {
              backgroundColor: theme.colors.white
            }
          ]}
        />
        <ToggleButton
          icon="view-list"
          value="list"
          color={value === "list" ? theme.colors.primary : theme.colors.white}
          style={[
            styles.listToggle,
            value === "list" && {
              backgroundColor: theme.colors.white
            }
          ]}
        />
      </ToggleButton.Row>
    </Animatable.View>
  );

const styles = StyleSheet.create({
  row: { paddingLeft: 10 },
  mapToggle: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 48,
    borderWidth: 2,
    borderColor: theme.colors.white
  },
  listToggle: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    height: 48,
    borderWidth: 2,
    borderColor: theme.colors.white
  }
});

export default SearchToggleHeader;
