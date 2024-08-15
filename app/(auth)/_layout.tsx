import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            statusBarAnimation: "slide",
            animation: "slide_from_right"

        }}>
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
        </Stack>
    );
}