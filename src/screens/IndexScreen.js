import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts()

        const listener = navigation.addListener('didFocus', () => { // must always clean up after listeners
            getBlogPosts(); 
        })

        return () => { // turn off listeners when this component gets unmounted
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList 
                data={state} 
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("Show", { id: item.id })}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.titleStyle}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress = {() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" style={styles.iconStyle}/>
                                </TouchableOpacity>
                            </View> 
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => { // function will be called whenever indexscreen is displayed by react navigation
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        ),
    };    
}

styles = StyleSheet.create({
    rowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        color: "gray",
    },
    titleStyle: {
        fontSize: 18,
    },
    iconStyle: {
        fontSize: 24,
    }
});

export default IndexScreen;