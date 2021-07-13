import {StackNavigationProp} from '@react-navigation/stack';
import React from "react";
import {Post} from "../components/post";
import {PostList} from "../components/postList";
import {RootStackParamList} from "../navigation/postsNavigator";
import {useSelector} from "react-redux";
import {AppRootState} from "../store/store";
import {PostType} from "../store/post-reducer";


type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Main'>
}

export const BookedScreen = (props:PropsType) => {
    const bookedPosts = useSelector<AppRootState, Array<PostType>>(state => state.post.bookedPosts)
    const openPostHandler = (post: PostType) => {
        props.navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
    }
    return <PostList data={bookedPosts} onOpen={openPostHandler}/>
}
