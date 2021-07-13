import {createStackNavigator} from "@react-navigation/stack";
import {DrawerNavigationProp} from "@react-navigation/drawer"
import {MainScreen} from "../screens/mainScreen";
import {PostScreen} from "../screens/postScreen";
import * as React from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";
import {Platform} from "react-native";
import {THEME} from "../common/theme";
import {RootDrawerParamList} from "./rootNavigation";

export type RootStackParamList = {
    Post: {
        postId: number
        date: string
        booked: boolean
    },
    Main: undefined,
}
export const Stack = createStackNavigator<RootStackParamList>()
const mainScreenOptions = (navigation:DrawerNavigationProp<RootDrawerParamList, 'Posts'> ) => {
    return {
        title: 'Main',
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={'Take Photo'}
                  iconName={'ios-camera'}
                  onPress={() => {
                      navigation.navigate('Create post')
                  }}
            />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={'drawer'}
                  iconName={'ios-menu'}
                  onPress={() => {
                     navigation.toggleDrawer()
                  }}
            />
        </HeaderButtons>
    }

}
// const postScreenOptions = (route: RouteProp<RootStackParamList, 'Post'>) => {
//     return {
//         title: 'Post',
//         // headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
//         //     <Item title={'booked'}
//         //           iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'}
//         //           onPress={() => {
//         //               route.params.changeBookedToggle(route.params.postId)
//         //           }}
//         //     />
//         // </HeaderButtons>
//     }
// }
export const defaultScreenOptions = {
    headerShown: true, headerStyle: {
        backgroundColor: Platform.OS === "ios" ? '#fff' : THEME.MAIN_COLOR
    }, headerTintColor: Platform.OS === "ios" ? THEME.MAIN_COLOR : '#fff'
}
export const PostsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen name={'Main'} component={MainScreen} options={({navigation}) => mainScreenOptions(navigation)}/>
            <Stack.Screen name={'Post'} component={PostScreen}/>
        </Stack.Navigator>
    );
}
