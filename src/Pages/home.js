import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
} from "react-native";

// query helper with built in cache
import { useQuery } from "react-query";

import { HomeCard } from "../Components/homeCard";

// utility functions to query API
import { generateSixRandom, searchHero } from "../utils/fetchApi";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Platform.OS === "web" ? "88vh" : "100%",
    backgroundColor: "#e2e2e2",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  TextInputContainer: {
    flex: 3,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    height: 40,
    backgroundColor: "#e2e2e2",
  },
  TextInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchButtonContainer: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
  searchButton: {
    flex: 1,
    backgroundColor: "#900C3F",
    borderRadius: 10,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
  },
  mainContainer: {
    flex: 5,
  },
  cardHolderContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around",
    marginTop: 15,
  },
  cardHolder: {
    flexBasis: Platform.OS === "web" ? "30%" : "46%",
    height: Platform.OS === "web" ? "42%" : "25%",
  },
  footerContainer: {
    flex: 0.5,
    textAlign: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
  },
  footerText: {
    fontSize: 24,
    color: "#44BBFF",
  },
});

export function Home({ navigation }) {
  const [superHeroName, setSuperHeroName] = useState("");
  const [superHeroData, setSuperHeroData] = useState([]);
  const [superHeroFetchError, setSuperHeroFetchError] = useState("");

  const [isReFetching, setIsReFetching] = useState(false);

  // fetch 6 random superheroes to populate the landing page
  const {
    status: superHeroesStatus,
    data: superHeroesData,
    isFetching: isFetchingSuperHeroes,
    refetch,
  } = useQuery("superHeroes", async () => {
    const fetchData = await generateSixRandom();
    return fetchData;
  });

  // refetch on pull down
  const invalidateAndRefetch = () => {
    setIsReFetching(true);
    setSuperHeroData([]);
    setSuperHeroFetchError("");
    refetch().then(() => setIsReFetching(false));
  };

  // programmatically toggle-able alert
  const createAlertPopUp = () => {
    const alertTitle = "Warning!";
    const alertText =
      "The result set for this query is too large. Please enter a narrowed down search term. Showing only the first six results";

    // - only for web as a drop in replacement for react native alert api
    // - which has not been implemented for react native web yet
    // - https://github.com/necolas/react-native-web/issues/1026

    if (Platform.OS === "web") {
      return alert(alertText);
    } else {
      return Alert.alert(
        alertTitle,
        alertText,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  // search one hero by name
  async function searchByName(name) {
    setIsReFetching(true);
    await searchHero(name)
      .then((fetchData) => {
        if (fetchData.response === "success") {
          setSuperHeroFetchError("");
          if (fetchData.results.length > 6) {
            let trimmedData = fetchData.results.filter(
              (_, index) => !(index > 5)
            );
            createAlertPopUp();
            setSuperHeroData(trimmedData);
            setIsReFetching(false);
            // dismiss keyboard
            Keyboard.dismiss();
            return;
          }
          setSuperHeroData(fetchData.results);
          setIsReFetching(false);
          // dismiss keyboard
          Keyboard.dismiss();
          return;
        }
        setSuperHeroFetchError(fetchData.error);
        setIsReFetching(false);
        return;
      })
      .catch((error) => setSuperHeroFetchError(error));
    setIsReFetching(false);
    return;
  }

  // programmatically navigate to profile page
  const navigateToProfile = (superHero) =>
    navigation.navigate("Profile", {
      hero: superHero,
    });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.TextInputContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Find Your SuperHero!"
            onChangeText={(text) => setSuperHeroName(text)}
            value={superHeroName}
          />
        </View>

        <View style={styles.searchButtonContainer}>
          {/* Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              searchByName(superHeroName);
            }}
          >
            <Text style={styles.searchButtonText}>Q</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 2 */}
      <View style={styles.mainContainer}>
        <View style={styles.cardHolderContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            // handle page refresh (refetch on pull down)
            refreshControl={
              <RefreshControl
                refreshing={isReFetching}
                onRefresh={invalidateAndRefetch}
              />
            }
          >
            {!isFetchingSuperHeroes ? (
              // there was an error fetching
              superHeroFetchError ? (
                <Text>{superHeroFetchError}</Text>
              ) : superHeroData.length > 0 ? (
                // map found superheroes
                superHeroData.map((aSuperHero, cardIndex) => (
                  //  card
                  <View style={styles.cardHolder} key={cardIndex}>
                    <HomeCard
                      SuperHero={aSuperHero}
                      navigateToProfile={() => navigateToProfile(aSuperHero)}
                    />
                  </View>
                ))
              ) : superHeroesStatus === "success" ? (
                // map random superheroes
                superHeroesData.map((aSuperHero, cardIndex) => (
                  //  card
                  <View style={styles.cardHolder} key={cardIndex}>
                    <HomeCard
                      SuperHero={aSuperHero}
                      navigateToProfile={() => navigateToProfile(aSuperHero)}
                    />
                  </View>
                ))
              ) : (
                <Text>There was an error fetching. Pull down to refresh</Text>
              )
            ) : (
              !isReFetching && (
                <ActivityIndicator size="large" color="#0000ff" />
              )
            )}

            {/* 
            - only for web as a drop in replacement for refreshControll api 
            - which has not been implemented for react native web yet 
            - https://github.com/necolas/react-native-web/issues/1027
            */}
            {Platform.OS === "web" && isReFetching && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{
                  position: "absolute",
                  alignSelf: "center",
                }}
              />
            )}
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
