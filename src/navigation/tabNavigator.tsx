import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {THEME} from "../common/theme";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {PostsNavigator, RootStackParamList} from "./postsNavigator";
import {BookedNavigator, BookedRootParamList} from "./bookedNavigator";

export type RootTabParamList = {
    Posts: RootStackParamList
    Booked:BookedRootParamList
}
export const Tab = createBottomTabNavigator<RootTabParamList>()
export const BottomTab = () => {
    return <Tab.Navigator tabBarOptions={{activeTintColor: THEME.MAIN_COLOR}}>
    <Tab.Screen name={'Posts'} component={PostsNavigator}
    options={{
        tabBarIcon: (info) => <Ionicons name={'ios-albums'}
        color={info.color} size={25}/>
    }}/>
    <Tab.Screen name={'Booked'} component={BookedNavigator} options={{
        tabBarIcon: (info) => <Ionicons name={'ios-star'} color={info.color} size={25}/>
    }}/>
    </Tab.Navigator>
}
