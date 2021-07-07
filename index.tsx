import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {RootNavigator} from "./src/navigation/rootNavigation";
import {Provider} from "react-redux";
import {store} from "./src/store/store";

export default function Navigation() {
    return (
        <NavigationContainer>
            <Provider store={store}>
            <RootNavigator/>
            </Provider>
        </NavigationContainer>
    );
}

