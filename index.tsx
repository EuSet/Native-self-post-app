import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {BottomTab} from "./src/navigation/tabNavigator";

export default function Navigation() {
    return (
        <NavigationContainer>
            <BottomTab/>
        </NavigationContainer>
    );
}

