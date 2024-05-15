import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { GET_MOVIEBYNAME } from "../utils/Queries";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";
import { RouteProp } from "@react-navigation/native";


type DisplayLikedMovieProps ={
    movieName: String,
    navigation: NativeStackNavigationProp<RootStackParamList, "DisplayMovie">,
    route: RouteProp<RootStackParamList, "DisplayMovie">
}

type DisplaySingleMovieProps = {
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: number,
    vote_average: number,
    release_date: String,
    navigation: NativeStackNavigationProp<RootStackParamList, "DisplayMovie">
    route: RouteProp<RootStackParamList, "DisplayMovie">
}


export default function DisplayLikedMovie({movieName, navigation, route}: DisplayLikedMovieProps){
    const {data } = useQuery(GET_MOVIEBYNAME, {
        variables: { title: movieName },
      });

    return (
    <>
    {data && data.movieByName.map(({ title, genres, poster_path, runtime, original_language, id, vote_average, release_date }: DisplaySingleMovieProps) => { return (
            <DisplaySingleMovie key={id} release_date={release_date} vote_average={vote_average} poster_path={poster_path} title={title} runtime={runtime} genres={genres} navigation={navigation} route={route} id={id}/>
    )})}
    </>
    )
}
