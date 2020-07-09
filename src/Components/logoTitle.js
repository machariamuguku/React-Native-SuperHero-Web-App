import React from "react";
import { StyleSheet, Image, View, Text, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: Platform.OS === "web" ? 60 : 45,
    height: Platform.OS === "web" ? 60 : 45,
    marginRight: 2,
  },
  title: {
    fontSize: Platform.OS === "web" ? 30 : 25,
    fontWeight: "bold",
  },
});
export function LogoTitle({ children }) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/app_logo.png")} />
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
