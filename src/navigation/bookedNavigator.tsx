import {createStackNavigator} from "@react-navigation/stack";
import {DrawerNavigationProp} from "@react-navigation/drawer"
import {BookedScreen} from "../screens/bookedScreen";
import {PostScreen} from "../screens/postScreen";
import * as React from "react";
import {defaultScreenOptions} from "./postsNavigator";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";

export type BookedRootParamList = {
    Post: undefined
    Booked: undefined
}

export const BookedStackNavigator = createStackNavigator<BookedRootParamList>()
export const bookedScreenOptions = (navigation:DrawerNavigationProp<BookedRootParamList, 'Booked'>) => {
    return {
        title:'About',
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
export const BookedNavigator = () => {
    return <BookedStackNavigator.Navigator screenOptions={defaultScreenOptions}>
        <BookedStackNavigator.Screen name={'Booked'} component={BookedScreen} options={({navigation}) => bookedScreenOptions(navigation)}/>
        <BookedStackNavigator.Screen name={'Post'} component={PostScreen}/>
    </BookedStackNavigator.Navigator>
}
