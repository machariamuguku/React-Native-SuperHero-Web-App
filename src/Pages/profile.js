import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
} from "react-native";

const styles = StyleSheet.create({
  // switch header background color by character alignment
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    top: Platform.OS === "web" ? 70 : 50,
    left: Platform.OS === "web" ? 40 : 10,
    right: Platform.OS === "web" ? 40 : 10,
    height: Platform.OS === "web" ? 220 : 155,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  horizontalContainerA: {
    flex: 2,
    flexDirection: "row",
  },
  horizontalContainerB: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "flex-end",
    marginBottom: Platform.OS === "web" ? 20 : 10,
  },
  img: {
    width: Platform.OS === "web" ? 200 : 100,
    height: Platform.OS === "web" ? 200 : 100,
    marginTop: Platform.OS === "web" ? -55 : -25,
    marginLeft: Platform.OS === "web" ? 75 : 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
  Right: {
    flex: 1,
    flexDirection: "column",
    marginLeft: Platform.OS === "web" ? "30%" : 15,
  },
  RightHeader: {
    fontSize: Platform.OS === "web" ? 55 : 25,
  },
  Holder: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  Header: {
    display: "flex",
    marginRight: Platform.OS === "web" ? "auto" : 5,
    justifyContent: "space-around",
  },
  BTextHeader: {
    fontSize: 16,
  },
  BText: {
    fontSize: 18,
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
    marginTop: Platform.OS === "web" ? 200 : 110,
    zIndex: -1,
    backgroundColor: "#e2e2e2",
  },
  bottomChild: {
    marginTop: 115,
    backgroundColor: "#ecf0f1",
    marginHorizontal: Platform.OS === "web" ? 40 : 10,
    borderRadius: 7,
    flex: 1,
  },
  bottomScrollView: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    flexWrap: Platform.OS === "web" ? "wrap" : "nowrap",
    width: Platform.OS === "web" ? "98%" : "auto",
    justifyContent: Platform.OS === "web" ? "space-between" : "flex-start",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  bottomCard: {
    flex: Platform.OS === "web" ? "auto" : 1,
    margin: "1%",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    width: Platform.OS === "web" ? "48%" : "auto",
  },
  bottomHeader: {
    fontSize: 18,
    textAlign: "center",
  },
  bottomCardHolder: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderColor: "red",
  },
  flexTable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  Content: {
    maxWidth: Platform.OS === "web" ? "75%" : 220,
  },
  footerContainer: {
    flex: 1,
    textAlign: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
  },
  footerText: {
    fontSize: 24,
    color: "#44BBFF",
  },
});

export function Profile({ route }) {
  // de-structure hero
  const { hero } = route.params;

  // returns sentence case
  const capitalizeFirstLetter = (sentence) =>
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  return (
    // switch header color by alignment
    <View
      style={
        (styles.container,
        {
          backgroundColor:
            hero.biography.alignment === "good" ? "#44BBFF" : "#900C3F",
        })
      }
    >
      <View style={styles.topContainer}>
        <View style={styles.horizontalContainerA}>
          {/* show placeholder if image is not present */}
          <Image
            source={
              hero?.image?.url
                ? {
                    uri: hero.image.url,
                  }
                : require("../assets/superhero.png")
            }
            style={styles.img}
          />
          <View style={styles.Right}>
            {/* show "unknown if name is not given" */}
            <Text style={styles.RightHeader}>
              {hero.biography["full-name"] ? hero.biography["full-name"] : "-"}
            </Text>

            {/* flex table */}
            <View style={styles.Holder}>
              <View style={styles.Header}>
                <Text>Name</Text>
                <Text>Publisher</Text>
                <Text>Alignment</Text>
              </View>

              <View style={styles.Header}>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
              </View>

              <View style={styles.Header}>
                <Text>{hero.name !== "null" ? hero.name : "-"}</Text>
                <Text>
                  {hero.biography.publisher !== "null"
                    ? hero.biography.publisher
                    : "-"}
                </Text>
                <Text>
                  {hero.biography.alignment !== "null"
                    ? capitalizeFirstLetter(hero.biography.alignment)
                    : "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* child 2 */}
        {/* show '-' if subsequent detail is not present */}
        <View style={styles.horizontalContainerB}>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.intelligence !== "null"
                ? hero.powerstats.intelligence
                : "-"}
            </Text>
            <Text style={styles.BTextHeader}>Intelligence</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.strength !== "null"
                ? hero.powerstats.strength
                : "-"}
            </Text>
            <Text style={styles.BTextHeader}>Strength</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.speed !== "null" ? hero.powerstats.speed : "-"}
            </Text>
            <Text style={styles.BTextHeader}>Speed</Text>
          </View>
        </View>
      </View>
      {/* bottom container */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomChild}>
          <ScrollView contentContainerStyle={styles.bottomScrollView}>
            {/* card */}
            {Object.keys(hero).map((heroObjectKey, index) => {
              // copy hero object to avoid mutating origin
              let newHeroObject = { ...hero };

              // re-assign the 'name' object key to an object
              // to map object rather than string later
              if (heroObjectKey === "name") {
                newHeroObject[heroObjectKey] = {
                  name: newHeroObject[heroObjectKey],
                };
              }
              return (
                // don't map the 'response', and 'id' object keys
                // they are not needed and are strings not objects
                heroObjectKey !== "response" &&
                heroObjectKey !== "id" && (
                  <View style={styles.bottomCard} key={index}>
                    {/* here */}
                    <View style={styles.bottomCardHolder}>
                      {/* card header */}
                      <Text style={styles.bottomHeader}>
                        {capitalizeFirstLetter(heroObjectKey)}
                      </Text>

                      {/* get key-value pairs from nested hero objects */}
                      {Object.entries(newHeroObject[heroObjectKey]).map(
                        ([key, entryValue], entriesIndex) => (
                          // flex table
                          <View key={entriesIndex} style={styles.flexTable}>
                            {/* left side */}
                            <View style={styles.Header}>
                              <Text>{`${capitalizeFirstLetter(key)}:`}</Text>
                            </View>

                            {/* right side */}
                            <View style={styles.Content}>
                              <Text>
                                {/* if the value is an array, map and separate */}
                                {entryValue && typeof entryValue === "object"
                                  ? entryValue.map(
                                      (values, entryValueIndex) =>
                                        `${values}${
                                          entryValueIndex <
                                          entryValue.length - 1
                                            ? " / "
                                            : ""
                                        }`
                                    )
                                  : entryValue !== "null"
                                  ? entryValue
                                  : "-"}
                              </Text>
                            </View>
                          </View>
                        )
                      )}

                      {/* to here */}
                    </View>
                  </View>
                )
              );
            })}
          </ScrollView>
        </View>
      </View>
      {/* only show footer on web */}
      {Platform.OS === "web" && (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>www.muguku.co.ke</Text>
        </View>
      )}
    </View>
  );
}
