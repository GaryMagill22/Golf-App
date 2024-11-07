import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

const Page = () => {

    const handleBack = () => {
        router.back();
    }

    return (
        <View>
            <Text>home</Text>
            <Button onPress={handleBack} title="Back" /> 
        </View>
    )
}

export default Page;