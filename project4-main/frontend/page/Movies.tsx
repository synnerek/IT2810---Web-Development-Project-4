import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "../components/DisplaySingleMovie";
import { MovieFeed } from "../utils/Queries";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";
import { Button } from "@rneui/base";
import { RouteProp } from "@react-navigation/native";
import { MOVIESPERPAGE } from "../assets/const";


type MovieProps = {
  text: string;
  filter: string;
  sort: number;
  sortType: string;
  offset: number;
  numberOfPages: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  navigation: NativeStackNavigationProp<RootStackParamList, "HomePage">,
  route: RouteProp<RootStackParamList, "HomePage">
};

export type DisplaySingleMovieProps = {
  poster_path: String;
  original_language: String;
  title: String;
  runtime: number;
  genres: [String];
  id: number;
  vote_average: number;
  release_date: String;
};

export default function Movies({
  navigation,
  route,
  filter,
  text,
  sort,
  sortType,
  offset, 
  setOffset,
}: MovieProps) {
  const { loading, error, data } = useQuery(MovieFeed, {
    variables: {
      offset: offset,
      limit: MOVIESPERPAGE,
      filter: filter,
      text: text,
      sort: sort,
      sortType: sortType,
    },
  });

  function handlePress(){
     setOffset(prev => prev+MOVIESPERPAGE)
  }

  function handlePrev(){
    setOffset(prev => prev - MOVIESPERPAGE)
  }
  
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  return (
    <ScrollView>
      {offset > 0 && <Button type="clear" onPress={handlePrev}><Text style={styles.button}>Previous page</Text></Button>}
      <View style={styles.singleMovie}>
        {data.moviesBySearch.map(
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
                route={route}
                id={id}
                poster_path={poster_path}
                release_date={release_date}
                vote_average={vote_average}
                title={title}
                runtime={runtime}
                genres={genres}
              />
            );
          }
        )}
      </View>
      <Button type="clear" onPress={handlePress} disabled={data.moviesBySearch.length < MOVIESPERPAGE}><Text style={styles.button}>Next page</Text></Button>
    </ScrollView>
  );
}

 const styles = StyleSheet.create({
  button:{
    fontSize: 16,
    padding:16,
    color: "pink"
  },
  singleMovie: {
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center"
  },
  
})
  