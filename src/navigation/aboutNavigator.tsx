import {createStackNavigator} from "@react-navigation/stack";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import * as React from "react";
import {defaultScreenOptions} from "./postsNavigator";
import {AboutScreen} from "../screens/aboutScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";

export type RootAboutParamList = {
    About:undefined
}

export const AboutStackNavigator = createStackNavigator<RootAboutParamList>()
export const aboutScreenOptions = (navigation:DrawerNavigationProp<RootAboutParamList, 'About'>) => {
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
export const AboutNavigator = () => {
    return <AboutStackNavigator.Navigator screenOptions={defaultScreenOptions}>
        <AboutStackNavigator.Screen name={'About'} component={AboutScreen}
                                    options={({navigation}) => aboutScreenOptions(navigation)}/>
    </AboutStackNavigator.Navigator>
}
