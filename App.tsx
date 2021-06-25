import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './index';
import AppLoading from "expo-app-loading";
import {bootstrap} from "./src/common/bootstrap";

export default function App() {
    const [isReady, setIsReady] = useState(false)
    if (!isReady) {
        return <AppLoading
            onFinish={() => setIsReady(true)}
            onError={(e) => console.log(e)}
            startAsync={bootstrap}
        />
    }
    return (
        <SafeAreaProvider>
            <Navigation/>
            <StatusBar/>
        </SafeAreaProvider>
    );
}

