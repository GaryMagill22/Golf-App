import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react' 

export default function index() {

const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [ loading, setLoading ] = useState(false);



    return (
        <View style={styles.container}>
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
