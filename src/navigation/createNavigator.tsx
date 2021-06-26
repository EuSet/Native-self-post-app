import {createStackNavigator} from "@react-navigation/stack";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import * as React from "react";
import {defaultScreenOptions} from "./postsNavigator";
import {CreateScreen} from "../screens/createScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/appHeaderIcon";

export type RootCreateParamList = {
    Create:undefined
}

export const CreateStackNavigator = createStackNavigator<RootCreateParamList>()
export const createScreenOptions = (navigation:DrawerNavigationProp<RootCreateParamList, 'Create'>) => {
    return {
        title:'Create',
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
export const CreateNavigator = () => {
    return <CreateStackNavigator.Navigator screenOptions={defaultScreenOptions}>
        <CreateStackNavigator.Screen name={'Create'} component={CreateScreen} options={({navigation}) => createScreenOptions(navigation)}/>
    </CreateStackNavigator.Navigator>
}
