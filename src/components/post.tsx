import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {PostType} from "../store/post-reducer";

type PropsType = {
    post: PostType
    onOpen:(post:PostType) => void
}

export const Post: React.FC<PropsType> = ({post, onOpen}) => {
    return <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
    <View style={styles.post}>
        <ImageBackground style={styles.image} source={{uri: post.img}}>
        <View style={styles.textWrap}>
            <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
        </View>
        </ImageBackground>
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    post: {
        width:150,
        height: 150,
        marginHorizontal:15,
        marginBottom:15,
        borderRadius:5,
        overflow:"hidden"
    },
    image: {
        width:'100%',
        height:200,
    },
    textWrap:{
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        paddingVertical:5,
        alignItems:'center',
        width:'100%'
    },
    title:{
        color:'#fff',
        fontFamily:'open-regular'
    }
})
