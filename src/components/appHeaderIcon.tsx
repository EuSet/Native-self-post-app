import React from "react";
import {HeaderButton} from "react-navigation-header-buttons";
import {Platform} from "react-native";
import {THEME} from "../common/theme";
import {Ionicons} from "@expo/vector-icons";

type PropsType = {

}

export const AppHeaderIcon = (props:PropsType) => {
    return <HeaderButton
        {...props}
        IconComponent={Ionicons}
        title={''}
        iconSize={24}
        color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
    />
}
