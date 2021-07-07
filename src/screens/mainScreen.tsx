import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from "react";
import {PostType} from "../data";
import {Post} from "../components/post";
import {PostList} from "../components/postList";
import {RootStackParamList} from "../navigation/postsNavigator";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/post-reducer";
import {AppRootState} from "../store/store";
import {RouteProp, useRoute} from "@react-navigation/native";


type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Main'>
}

export const MainScreen = (props:PropsType) => {
    const dispatch = useDispatch()
    const route = useRoute<RouteProp<RootStackParamList, 'Post'>>()
    const allPosts = useSelector<AppRootState, Array<PostType>>(state => state.post.allPosts)
    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])
    const openPostHandler = (post: PostType) => {
        props.navigation.navigate('Post', {...route.params,postId: post.id, date: post.date, booked: post.booked})
    }
    return <PostList data={allPosts} onOpen={openPostHandler}/>
}
