import {FlatList, StyleSheet, View} from "react-native";
import React from "react";
import {Post} from "../components/post";
import {DataType, PostType} from "../data";

type PropsType = {
    data:DataType
    onOpen:(post:PostType) => void
}
export const PostList = (props:PropsType) => {
    return <View style={styles.wrap}>
                <FlatList data={props.data} keyExtractor={post => post.id} renderItem={({item}) => {
            return <Post post={item} onOpen={props.onOpen}/>
        }}/>
    </View>
}

const styles = StyleSheet.create({
    wrap:{
        padding:10
    }
})

