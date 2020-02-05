import React, { useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { Linking } from "expo";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import theme from "../constants/theme";

import MapToggle from "../components/MapToggle";
import LoadingMessage from "../components/LoadingMessage";
import FloatingButton from "../components/FloatingButton";
import WorkspaceList from "../components/WorkspaceList";

export default function HomeScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [mapToggle, setMapToggle] = useState("map");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const findWorkspacesByLocation = async ({ latitude, longitude }) => {
    setLoading(true);

    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      500
    );

    const places = await fetch(
      `https://workfrom.co/api/places/ll/${latitude},${longitude}?appid=wfmaster0LaxZcmiCkniRhNmnOgAqg&pending=1&radius=10&dow=1&rpp=100&psm=strict&`
    ).then(res => res.json());

    setPlaces(places.response);
    setLoading(false);
  };

  const findWorkspacesNearMe = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permissions denied");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const [{ city }] = await Location.reverseGeocodeAsync(coords);

    setSearchValue(city);
    findWorkspacesByLocation(coords);
  };

  const findWorkspacesBySearchQuery = async e => {
    if (e.nativeEvent.text === "") {
      return;
    }

    setLoading(true);

    const coords = await Location.geocodeAsync(e.nativeEvent.text);

    if (coords.length == 0) {
      return;
    }

    const { latitude, longitude } = coords[0];

    findWorkspacesByLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search for workspaces"
          onChangeText={setSearchValue}
          value={searchValue}
          style={styles.flex}
          onSubmitEditing={findWorkspacesBySearchQuery}
        />
        <MapToggle
          value={mapToggle}
          onValueChange={setMapToggle}
          visible={places.length > 0}
        />
      </View>
      <View style={styles.flex}>
        <LoadingMessage
          visible={loading}
          message={`Finding workspaces in ${searchValue}`}
        />
        <FloatingButton
          label="Workspaces near me"
          onPress={findWorkspacesNearMe}
        />
        <WorkspaceList visible={mapToggle === "list"} places={places} />
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
        >
          {places.map(place => (
            <Marker
              style={styles.marker}
              key={place.ID}
              image={require("../assets/images/marker-red.png")}
              coordinate={{
                latitude: parseFloat(place.latitude),
                longitude: parseFloat(place.longitude)
              }}
              title={place.title}
              description={place.description}
              onCalloutPress={() =>
                Linking.openURL(`https://workfrom.co/${place.slug}`)
              }
            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  headerImage: {
    width: 200,
    resizeMode: "contain",
    height: 40
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -10
  },
  marker: { width: 10 }
});

HomeScreen.navigationOptions = {
  headerTintColor: theme.colors.white,
  headerStyle: {
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 0
  },
  headerTitle: (
    <Image
      source={require("../assets/images/workfrom-logo.png")}
      style={styles.headerImage}
    />
  )
};
