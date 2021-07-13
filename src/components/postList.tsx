import {FlatList, StyleSheet, View, Text} from "react-native";
import React from "react";
import {Post} from "./post";
import {DataType, PostType} from "../store/post-reducer";

type PropsType = {
    data:DataType
    onOpen:(post:PostType) => void
}
export const PostList = (props:PropsType) => {
    if(!props.data.length){
        return <View style={styles.wrap}><Text style={styles.noItems}>Add first post</Text></View>
    }
    return <View style={styles.wrap}>
                <FlatList data={props.data} keyExtractor={post => post.id} renderItem={({item}) => {
            return <Post post={item} onOpen={props.onOpen}/>
        }}/>
    </View>
}

const styles = StyleSheet.create({
    wrap:{
        padding:10
    },
    noItems:{
        fontFamily:'open-regular',
        textAlign:'center',
        marginVertical:10,
        fontSize:18
    }
})

