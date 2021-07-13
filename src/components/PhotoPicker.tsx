import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, {useState} from "react";
import {Alert, Button, Image, LogBox, StyleSheet, View} from "react-native";
import {ImagePickerResult} from "expo-image-picker";

LogBox.ignoreLogs(([''])) //hide warning
async function askForPermissions() {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
    )
    if (status !== 'granted') {
        Alert.alert('error')
        return false
    } else {
        return true
    }
}

export type PropsType = {
    onPick: (uri:string) => void
}
export const PhotoPicker:React.FC<PropsType> = ({onPick}) => {
    const [image, setImage] = useState<string | null>(null)

    const takePhoto = async () => {
        const hasPermission = askForPermissions()
        if (!hasPermission) {
            return
        }
        const img: ImagePickerResult = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9]
        })
        if (!img.cancelled && "uri" in img) {
            setImage(img.uri);
            onPick(img.uri)
        }
    }

    return <View style={styles.wrapper}>
        <Button title={'create photo'} onPress={takePhoto}/>
        {image && <Image style={styles.image} source={{uri: image}}/>}
    </View>
}
const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
})
