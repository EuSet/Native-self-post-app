import {Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addPostThunk} from "../store/post-reducer";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootDrawerParamList} from "../navigation/rootNavigation";
import {PhotoPicker} from "../components/PhotoPicker";
import {createPostType} from "../db";

type PropsType = {
    navigation: StackNavigationProp<RootDrawerParamList, 'Create post'>
    // route: RouteProp<{ params: { postId: string, date:string, booked:boolean } }, 'params'>
}
export const CreateScreen = (props: PropsType) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imageRef = useRef<string>('')
    const photoPickHandler = (uri:string) => {
        imageRef.current = uri
    }
    const saveHandler = () => {
        const data: createPostType = {
            booked: false,
            text,
            img:imageRef.current,
            date: new Date().toJSON()
        }
        dispatch(addPostThunk(data))

        //@ts-ignore
        props.navigation.navigate("Posts")

    }
    return <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrap}>
                <Text style={styles.title}>CreateScreen</Text>
                <TextInput style={styles.textarea} placeholder={'Add text'}
                           value={text} onChangeText={setText} multiline
                />
                <PhotoPicker onPick={photoPickHandler}/>
                <Button
                    title={'create post'}
                    onPress={saveHandler}
                    disabled={!text}
                />
            </View>
        </TouchableWithoutFeedback>
    </ScrollView>
}

const styles = StyleSheet.create({
    wrap: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'open-regular',
        marginVertical: 10,

    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    }
})
