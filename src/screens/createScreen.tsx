import {Text, View, StyleSheet} from "react-native";
import React from "react";

export const CreateScreen = () => {
    return <View style={styles.center}>
        <Text>CreateScreen</Text>
    </View>
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
