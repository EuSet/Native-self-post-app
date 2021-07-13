import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from "react";
import {Post} from "../components/post";
import {PostList} from "../components/postList";
import {RootStackParamList} from "../navigation/postsNavigator";
import {useDispatch, useSelector} from "react-redux";
import {loadPostsThunk, PostType} from "../store/post-reducer";
import {AppRootState} from "../store/store";
import {RouteProp, useRoute} from "@react-navigation/native";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {THEME} from "../common/theme";


type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Main'>
}

export const MainScreen = (props:PropsType) => {
    const dispatch = useDispatch()
    const loading = useSelector<AppRootState, boolean>(state => state.post.loading)
    const route = useRoute<RouteProp<RootStackParamList, 'Post'>>()
    const allPosts = useSelector<AppRootState, Array<PostType>>(state => state.post.allPosts)
    useEffect(() => {
        dispatch(loadPostsThunk())
    }, [dispatch])
    const openPostHandler = (post: PostType) => {
        props.navigation.navigate('Post', {...route.params,postId: post.id, date: post.date, booked: post.booked})
    }
    if(loading) return <View style={style.center}><ActivityIndicator color={THEME.MAIN_COLOR}/></View>
    return <PostList data={allPosts} onOpen={openPostHandler}/>
}

const style = StyleSheet.create({
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
})
