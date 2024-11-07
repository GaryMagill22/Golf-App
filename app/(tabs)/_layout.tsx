import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

    const [isLoading, setIsLoading] = React.useState(true);

    getAuth().onAuthStateChanged((user) => {
        setIsLoading(false);
        if (!user) {
            router.replace("/");
        }
    });


    return (
        <Tabs
            screenOptions={{
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: (true),
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-account" size={26} color="black" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="golf-cart" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="golf"
                options={{
                    title: 'Golf',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="golf-tee" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="rounds"
                options={{
                    title: 'Rounds',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-outline" size={24} color="black" />,
                }}
            />
        </Tabs>
    );
}