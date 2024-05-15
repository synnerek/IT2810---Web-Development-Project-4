import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import Movies from "./Movies";
import SearchField from "../components/SearchField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type HomePageProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

export default function HomePage({ navigation, route }: HomePageProps) {
  const [searchFilter, setSearchFilter] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(-1);
  const [sortType, setSortType] = useState("release_date");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  function logout() {
    AsyncStorage.setItem("isLoggedIn", "false");
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      {
        <SearchField
          searchText={searchText}
          filter={searchFilter}
          setSearchFilter={setSearchFilter}
          setSearchText={setSearchText}
          setNumberOfPages={setNumberOfPages}
          setSortType={setSortType}
          setOffset={setOffset}
          sortType={sortType}
          setSort={setSort}
          hidden={shouldShow}
        />
      }
      <Button color={"#99c5f0"} onPress={() => setShouldShow(!shouldShow)}>
        <Icon name="search" color="#fff" />
        {shouldShow ? "Search" : "Hide"}
      </Button>
      <Movies
        numberOfPages={numberOfPages}
        text={searchText}
        filter={searchFilter}
        sort={sort}
        sortType={sortType}
        navigation={navigation}
        route={route}
        offset={offset}
        setOffset={setOffset}
      />

      <View style={styles.footer}>
        <Button
          onPress={() => navigation.navigate("LikedMovies")}
          color="#99c5f0"
        >
          <Icon name="star" size={26} color="#fff" />
          <Text style={styles.logoutText}>Favorite Movies</Text>
        </Button>

        <Button onPress={logout} title="Logout" color="#99c5f0">
          <Icon name="logout" size={26} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#99c5f0",
    padding: 15,
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
  },
});
