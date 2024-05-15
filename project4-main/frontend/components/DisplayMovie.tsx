import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_MOVIE, GET_SIMILAR_MOVIES } from "../utils/Queries";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import WebView from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { Icon } from "@rneui/themed";
import FavoriteButton from "./FavoriteButton";
import { DisplaySingleMovieProps } from "../page/Movies";

type DisplayMovieProps = NativeStackScreenProps<
  RootStackParamList,
  "DisplayMovie"
>;

export default function DisplayMovie({ navigation, route }: DisplayMovieProps) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: id },
  });

  const [fetchSimilar, { data: similarData }] =
    useLazyQuery(GET_SIMILAR_MOVIES);

  useEffect(() => {
    if (data === undefined) return;
    fetchSimilar({
      variables: {
        ids: data.movieByID.similar.map((data: any) => parseInt(data.id)),
      },
    });
  }, [data, fetchSimilar]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{data.movieByID.title}</Text>
        <FavoriteButton movieTitle={data.movieByID.title} />

        <Image
          style={styles.image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
              data.movieByID.poster_path,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.text}>
            {data.movieByID.release_date.substring(0, 4)}
          </Text>
          <Text style={styles.icon}>
            <Icon name="star" size={16} />
            <Text>{data.movieByID.vote_average}</Text>
          </Text>
          <Text style={styles.text}>{data.movieByID.original_language}</Text>
          <Text style={styles.text}>{data.movieByID.runtime} minutes</Text>
        </View>

        <View>
          <View>
            <Text style={styles.header}>Directors</Text>
            <Text style={styles.text}>
              {data.movieByID.directors.map((d: any, index: number) => {
                return <Text key={index}>{d.name + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Cast</Text>
            <Text style={styles.text}>
              {data.movieByID.cast.map((a: any, index:any) => {
                return <Text key={index}>{a.name + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.text}>{data.movieByID.overview}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.header}>Categories</Text>
            <Text style={styles.text}>
              {data.movieByID.genres.map((c: any, index: any) => {
                return <Text key={index}>{c + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Trailer</Text>
            <WebView
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri:
                  "https://www.youtube.com/embed/" + data.movieByID.trailer_yt,
              }}
            />
            <Text style={styles.header}>Similar movies</Text>
            <View style={styles.singleMovie}>
              {similarData?.movieListByIDs.map( 
                ({
                  title,
                  genres,
                  poster_path,
                  runtime,
                  id,
                  vote_average,
                  release_date,
                }: DisplaySingleMovieProps) => {
                return (
                  <DisplaySingleMovie
                  key={id}
                    navigation={navigation}
                    poster_path={poster_path}
                    title={title}
                    runtime={runtime}
                    genres={genres}
                    vote_average={vote_average}
                    release_date={release_date}
                    id={id}
                    route={route}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  details: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#093663",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#093663",
    alignSelf: "flex-start",
  },
  video: {
    margin: 10,
    scalesPageToFit: true,
    width: "95%",
    height: 230,
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    alignSelf: "flex-start",
  },
  image: {
    alignSelf: "center",
    width: "95%",
    height: 430,
    borderRadius: 20,
  },
  icon: {
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  singleMovie: {
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    marginBottom: "10%"
  },
});
