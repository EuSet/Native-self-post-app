import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {RootNavigator} from "./src/navigation/rootNavigation";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator/>
        </NavigationContainer>
    );
}

