import {StackNavigationProp} from '@react-navigation/stack';
import React from "react";
import {DATA, PostType} from "../data";
import {Post} from "../components/post";
import {RootStackParamList} from "../../index";
import {PostList} from "../components/postList";


type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Main'>
}

export const MainScreen = (props:PropsType) => {
    const openPostHandler = (post: PostType) => {
        props.navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
    }
    return <PostList data={DATA} onOpen={openPostHandler}/>
}
