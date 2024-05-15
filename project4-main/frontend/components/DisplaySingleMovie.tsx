import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types";



type DisplaySingleMovieProps = NativeStackScreenProps<
  RootStackParamList,
  "DisplayMovie" | "HomePage"
> & {
  poster_path: String;
  title: String;
  runtime: number;
  genres: [String];
  vote_average: number;
  release_date: String;
  id: number;
};

export default function DisplaySingleMovie({
  navigation,
  poster_path,
  title,
  runtime,
  genres,
  vote_average,
  release_date,
  id,
}: DisplaySingleMovieProps) {
  let genresString = genres.join(", ");
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("DisplayMovie", { id })}
      >
        <Image
          style={styles.image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + poster_path,
          }}
        />

        {title.length > 25 ? (
          <Text style={styles.text}>{title.substring(0, 23) + "..."}</Text>
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}

        {genresString.length > 25 ? (
          <Text style={styles.text}>{genresString.substring(0, 23) + "..."}</Text>
        ) : (
          <Text style={styles.text}>{genresString}</Text>
        )}

        <View style={styles.movieInfo}>
          <Text>{runtime} min</Text>
          <Text style={styles.movieInfo}><Icon name="star" size={16} />{vote_average}</Text>
          <Text>{release_date.substring(0, 4)}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width:"50%",
    padding:8,
    fontSize: 12,
    cursor: "pointer",
    justifyContent:"center",
    textAlign: "center"
  },
  movieInfo: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    borderRadius: 20,
    height: 300,
  },
  text: {
    textAlign: "center"
  }
});
