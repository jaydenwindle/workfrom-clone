import React from "react";
import { Card, Paragraph, Chip } from "react-native-paper";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Linking } from "expo";

import theme from "../constants/theme";
const WorkspaceList = ({ visible, places }) =>
  visible && (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => Linking.openURL(`https://workfrom.co/${item.slug}`)}
          >
            {item.thumbnail_img !== "" && (
              <Card.Cover source={{ uri: item.thumbnail_img }} />
            )}
            <Card.Title title={item.title} subtitle={item.street} />
            {item.description !== "" && (
              <Card.Content>
                <Paragraph>{item.description}</Paragraph>
                <ScrollView horizontal style={styles.infoList}>
                  {item.distance !== "" && (
                    <Chip style={styles.infoItem} icon="map-marker-distance">
                      {item.distance} mi
                    </Chip>
                  )}
                  {item.password !== "" && (
                    <Chip style={styles.infoItem} icon="wifi">
                      {item.password}
                    </Chip>
                  )}
                  {item.power !== "" && (
                    <Chip style={styles.infoItem} icon="battery-charging">
                      {item.power}
                    </Chip>
                  )}
                </ScrollView>
              </Card.Content>
            )}
          </Card>
        )}
        keyExtractor={place => place.ID}
      />
    </View>
  );

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -8,
    backgroundColor: "#fff"
  },
  card: {
    margin: 10,
    borderRadius: 4
  },
  infoList: {
    marginTop: 10,
    flexDirection: "row"
  },
  infoItem: {
    marginRight: 10
  }
});

export default WorkspaceList;
