import {StyleSheet, Text, View, Image, Button, ScrollView, Alert} from "react-native";
import React, {useCallback, useEffect, useLayoutEffect} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useRoute} from '@react-navigation/native';
import {DATA} from "../data";
import {THEME} from "../common/theme";
import {RootStackParamList} from "../navigation/postsNavigator";
import {useDispatch, useSelector} from "react-redux";
import {changeBooked} from "../store/post-reducer";
import {AppRootState} from "../store/store";


type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Post'>
    // route: RouteProp<{ params: { postId: string, date:string, booked:boolean } }, 'params'>
}
export const PostScreen = (props:PropsType) => {
    const dispatch = useDispatch()
    const route = useRoute<RouteProp<RootStackParamList, 'Post'>>()
    const booked = useSelector<AppRootState, boolean>(state =>
        state.post.bookedPosts.some(p => p.id === route.params.postId))
    const changeBookedToggle = useCallback((id:string) => {
        dispatch(changeBooked(id))
    },[])
    useEffect(() => {
        props.navigation.navigate('Post', {...route.params, booked})
    }, [booked])
    useEffect(() => {
        props.navigation.navigate('Post', {...route.params, changeBookedToggle})
    }, [changeBookedToggle])
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: new Date(route.params.date).toLocaleDateString(),
        })
    })

    const removeHandler = () => {
        Alert.alert(
            "Remove To Do List",
            `Do you want to remove this post?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {

                    }
                }
            ],
            {cancelable: false,}
        )
    }
    const post = DATA.find(p => p.id === route.params.postId.toString())!
    return <ScrollView>
        <Image source={{uri: post.img}} style={styles.image}/>
        <View style={styles.textWrap}>
            <Text style={styles.title}>{post.text}</Text>
        </View>
    <Button title={'Delete'} color={THEME.DANGER_COLOR} onPress={removeHandler}/>
    </ScrollView>
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:200
    },
    textWrap:{
        padding:10
    },
    title:{
        fontFamily:'open-regular'
    }
})
