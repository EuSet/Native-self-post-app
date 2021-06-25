import {StyleSheet, Text, View, Image, Button, ScrollView, Alert} from "react-native";
import React, {useLayoutEffect} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useRoute} from '@react-navigation/native';
import {DATA} from "../data";
import {THEME} from "../common/theme";
import {RootStackParamList} from "../../index";

type PropsType = {
    navigation:StackNavigationProp<RootStackParamList, 'Post'>
    // route: RouteProp<{ params: { postId: string, date:string, booked:boolean } }, 'params'>
}
// export type ParamType = {
//     Main: {
//         postId:string
//         date:string
//         booked:boolean
//     }
// }
export const PostScreen = (props:PropsType) => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: new Date(route.params.date).toLocaleDateString(),
        })
    })
    const route = useRoute<RouteProp<RootStackParamList, 'Post'>>()
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
