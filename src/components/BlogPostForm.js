import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const BlogPostForm = ({ onSubmit, intialValues }) => {
    const [title, setTitle] = useState(intialValues.title);
    const [content, setContent] = useState(intialValues.content);

    return (
        <View>
            <Text style={styles.labelStyle}>Enter title:</Text>
            <TextInput style={styles.inputStyle} value={title} onChangeText={(text) => setTitle(text)}/>
            <Text style={styles.labelStyle}>Enter content:</Text>
            <TextInput style={styles.inputStyle} value={content} onChangeText={(text) => setContent(text)}/>
            <Button 
                title="Save Blog Post" 
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

BlogPostForm.defaultProps = {
    intialValues: {
        tilte: "",
        content: ""
    }
};

const styles = StyleSheet.create({
    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    labelStyle: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default BlogPostForm;