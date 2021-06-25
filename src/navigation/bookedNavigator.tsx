import {createStackNavigator} from "@react-navigation/stack";
import {BookedRootParamList} from "../../index";
import {BookedScreen} from "../screens/bookedScreen";
import {PostScreen} from "../screens/postScreen";
import * as React from "react";
import {defaultScreenOptions} from "./rootNavigator";

export type BookedRootParamList = {
    Post:{

    }
    Booked:{

    }
}

export const BookedStackNavigator = createStackNavigator<BookedRootParamList>()

export const BookedNavigator = () => {
    return <BookedStackNavigator.Navigator screenOptions={defaultScreenOptions}>
        <BookedStackNavigator.Screen name={'Booked'} component={BookedScreen}/>
        <BookedStackNavigator.Screen name={'Post'} component={PostScreen}/>
    </BookedStackNavigator.Navigator>
}
