import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";


const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context); // we can only destructure off state which is the big list of the blogposts

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam("id")); // is blogpost id equal to the navigation id
    navigation.getParam("id");
    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => { // function will be called whenever indexscreen is displayed by react navigation
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Edit", { id: navigation.getParam("id") })}>
            <EvilIcons name="pencil" size={30} />
          </TouchableOpacity>
        ),
    };    
}

const styles = StyleSheet.create({});

export default ShowScreen;
