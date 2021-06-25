import {FlatList, StyleSheet, View} from "react-native";
import React from "react";
import {Post} from "../components/post";
import {RootStackParamList} from "../../index";
import {StackNavigationProp} from "@react-navigation/stack";
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

// export const MainScreen = (props:PropsType) => {
//     const openPostHandler = (post:PostType) => {
//         props.navigation.navigate('Post', {postId: post.id, date:post.date, booked: post.booked})
//     }
//     return <View style={styles.wrap}>
//         <FlatList data={DATA} keyExtractor={post => post.id} renderItem={({item}) => {
//             return <Post post={item} onOpen={openPostHandler}/>
//         }}/>
//     </View>
// }

