import {createStackNavigator} from "@react-navigation/stack";
import {MainScreen} from "../screens/mainScreen";
import {PostScreen} from "../screens/postScreen";
import * as React from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";
import {RouteProp} from "@react-navigation/native";
import {Platform} from "react-native";
import {THEME} from "../common/theme";

export type RootStackParamList = {
    Post: {
        postId: string
        date: string
        booked: boolean
    },
    Main: undefined,
}
export const Stack = createStackNavigator<RootStackParamList>()
const mainScreenOptions = {
    title: 'Main',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take Photo'}
              iconName={'ios-camera'}
              onPress={() => {
                  console.log('take a photo')
              }}
        />
    </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'drawer'}
              iconName={'ios-menu'}
              onPress={() => {
                  console.log('menu')
              }}
        />
    </HeaderButtons>

}
const postScreenOptions = (route: RouteProp<RootStackParamList, 'Post'>) => {
    return {
        title: 'Post',
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={'booked'}
                  iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'}
                  onPress={() => {
                      console.log('take a photo')
                  }}
            />
        </HeaderButtons>
    }
}
export const defaultScreenOptions = {
    headerShown: true, headerStyle: {
        backgroundColor: Platform.OS === "ios" ? '#fff' : THEME.MAIN_COLOR
    }, headerTintColor: Platform.OS === "ios" ? THEME.MAIN_COLOR : '#fff'
}
export const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Main'} screenOptions={defaultScreenOptions}>
            <Stack.Screen name={'Main'} component={MainScreen} options={mainScreenOptions}/>
            <Stack.Screen name={'Post'} component={PostScreen} options={({route}) => postScreenOptions(route)}/>
        </Stack.Navigator>
    );
}
