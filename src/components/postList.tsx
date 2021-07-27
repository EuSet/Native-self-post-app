import {FlatList, StyleSheet, View, Text, RefreshControl} from "react-native";
import React from "react";
import {Post} from "./post";
import {DataType, PostType} from "../store/post-reducer";

type PropsType = {
    data: DataType
    onOpen: (post: PostType) => void
}
export const PostList = (props: PropsType) => {
    if (!props.data.length) {
        return <View style={styles.wrap}><Text style={styles.noItems}>Add first post</Text></View>
    }
    return <View style={styles.wrap}>
        <FlatList numColumns={2} ItemSeparatorComponent={() => <View style={styles.hr}></View>} data={props.data}
                  keyExtractor={post => post.id.toString()} renderItem={({item}) => {
            return <Post post={item} onOpen={props.onOpen}/>
        }}/>
    </View>
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        padding: 10,
    },
    noItems: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom:15,
    }
})

