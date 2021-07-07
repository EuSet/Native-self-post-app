import {
    Button,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useState} from "react";
import {PostType} from "../data";
import {useDispatch} from "react-redux";
import {addPost} from "../store/post-reducer";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootDrawerParamList} from "../navigation/rootNavigation";

const img = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'

type PropsType = {
    navigation: StackNavigationProp<RootDrawerParamList, 'Create post'>
    // route: RouteProp<{ params: { postId: string, date:string, booked:boolean } }, 'params'>
}
export const CreateScreen = (props:PropsType) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const saveHandler = () => {
        const data:PostType = {
            id: Date.now().toString(),
            booked:false,
            text,
            img,
            date: new Date().toJSON()
        }
        dispatch(addPost(data))

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
        <Image style={{width:'100%', height:200}}
            source={{uri:'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'}}/>
               <Button title={'create post'} onPress={saveHandler}/>
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
        marginBottom:10,
    }
})
