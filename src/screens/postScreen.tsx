import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useLayoutEffect} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useRoute} from '@react-navigation/native';
import {THEME} from "../common/theme";
import {RootStackParamList} from "../navigation/postsNavigator";
import {useDispatch, useSelector} from "react-redux";
import {changeBookedThunk, PostType, removePostThunk} from "../store/post-reducer";
import {AppRootState} from "../store/store";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";


type PropsType = {
    navigation: StackNavigationProp<RootStackParamList, 'Post'>
    // route: RouteProp<{ params: { postId: string, date:string, booked:boolean } }, 'params'>
}
export const PostScreen = (props: PropsType) => {
    const dispatch = useDispatch()
    const route = useRoute<RouteProp<RootStackParamList, 'Post'>>()
    const booked = useSelector<AppRootState, boolean>(state =>
        state.post.bookedPosts.some(p => p.id === route.params.postId))
    const post = useSelector<AppRootState, PostType>(state => state.post.allPosts.find(p => p.id === route.params.postId)!)
    const changeBookedToggle = useCallback((post: {booked:boolean, id:number}) => {
        dispatch(changeBookedThunk(post))
    }, [])
    useEffect(() => {
        props.navigation.setParams({booked})
    }, [booked])
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: new Date(route.params.date).toLocaleDateString(),
            headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title={'booked'}
                      iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'}
                      onPress={() => {changeBookedToggle({id:route.params.postId, booked:route.params.booked})}}
                />
            </HeaderButtons>
        })
    }, [props.navigation, route.params.booked])

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
                        props.navigation.navigate('Main')
                        dispatch(removePostThunk(route.params.postId))

                    }
                }
            ],
            {cancelable: false,}
        )
    }
    if(!post){
        return null
    }

    return <ScrollView>
        <Image source={{uri: post.img}} style={styles.image}/>
        <View style={styles.textWrap}>
            <Text style={styles.title}>{post.text}</Text>
        </View>
        <Button title={'Delete'} color={THEME.DANGER_COLOR} onPress={removeHandler}/>
    </ScrollView>
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})
