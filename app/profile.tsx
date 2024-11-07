import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileCard from '../components/ProfileCard';
const Profile = () => {




    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <ProfileCard/>
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