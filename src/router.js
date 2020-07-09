import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import { Home } from "./Pages/home";
import { Profile } from "./Pages/profile";
import { LogoTitle } from "./Components/logoTitle";

const Stack = createStackNavigator();

export function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        options={{
          headerTitleStyle: {
            height: "10vh",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          path="feed"
          component={Home}
          options={{
            title: "Home",
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "right",
              fontSize: Platform.OS === "web" ? 30 : 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
