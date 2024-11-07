import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = () => {

    const handleBack = () => {
        router.back();
    }


    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button  onPress={handleBack} title="Back" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profile;