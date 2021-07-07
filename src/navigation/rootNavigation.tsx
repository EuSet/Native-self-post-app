import {createDrawerNavigator} from "@react-navigation/drawer";
import {BottomTab, RootTabParamList} from "./tabNavigator";
import * as React from "react";
import {AboutNavigator} from "./aboutNavigator";
import {CreateNavigator} from "./createNavigator";
import {THEME} from "../common/theme";

export type RootDrawerParamList = {
    Posts: RootTabParamList,
    'About app': undefined
    'Create post': undefined

}
const Main = createDrawerNavigator<RootDrawerParamList>()
export const RootNavigator = () => {
    return (
        <Main.Navigator
            drawerContentOptions={{activeTintColor: THEME.MAIN_COLOR, labelStyle: {fontFamily: 'open-bold'}}}>
            <Main.Screen name={'Posts'} component={BottomTab}/>
            <Main.Screen name={'About app'} component={AboutNavigator}/>
            <Main.Screen name={'Create post'} component={CreateNavigator}/>
        </Main.Navigator>
    );
}
