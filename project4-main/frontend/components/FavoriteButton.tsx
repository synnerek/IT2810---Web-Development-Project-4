import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import { addFavoriteMutation, GET_USER, removeFavoriteMutation } from "../utils/Queries";
import { useLikedMovies } from "./LikedMovies";
import { Icon } from "@rneui/themed";

type LikedMoviesProps = {
  movieName: String;
};

type UserProps = {
  firstName: String;
  lastName: String;
  password: String;
  userName: String;
  likedMovies: [{ movieName: String }];
};

type FavoriteButtonProps = {
  movieTitle: string;
};

export default function FavoriteButton({ movieTitle }: FavoriteButtonProps) {
  const [clicked, setClicked] = useState(false);
  const likedMovies = useLikedMovies();
  const [id, setId] = useState("");
  const getIDValue = async () => {
    try {
      const userid = await AsyncStorage.getItem("userID");
      userid && setId(userid);
    } catch (e) {
      console.log(e)
    }
  };
  getIDValue();
  useEffect(() => {
    if (
      likedMovies.filter(
        ({ movieName }: LikedMoviesProps) => movieName === movieTitle
      ).length
    ) {
      setClicked(true);
    }
  }, [likedMovies, movieTitle]);

  const [addMovie] = useMutation<{ user: UserProps }>(addFavoriteMutation, {
    variables: { id: id, movieName: movieTitle },
    refetchQueries: [GET_USER],
  });

  const [removeMovie] = useMutation<{ user: UserProps }>(
    removeFavoriteMutation,
    {
      variables: { id: id, movieName: movieTitle },
      refetchQueries: [GET_USER],
    }
  );

  function handleClick() {
    clicked ? removeMovie() : addMovie();
    setClicked((prev) => !prev);
  }

  return (
    <View>
      {clicked ? (
        <View style={styles.container}>
          <Button onPress={handleClick} type="clear">
            <Icon name="star" size={36} />
            <Text>Remove from favorites</Text>
          </Button>
        </View>
      ) : (
        <View style={styles.container}>
          <Button onPress={handleClick} type="clear" color="black">
            <Icon name="star-outline" size={36} />
            <Text>Add to favorites</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "white",
    alignContent: "flex-start",
  }
});
