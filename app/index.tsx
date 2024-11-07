import { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';


const AuthIndex = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const auth = FIREBASE_AUTH;

    const db = getFirestore(FIREBASE_APP);


    const signUp = async () => {
        setLoading(true);
        try {
            // First, create the Firebase user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Firebaseuser created: ", user.uid, user.email);

            if (user) {
                try {

                    // Set the Firestore document with customerId
                    await setDoc(doc(db, "users", user.uid), {
                        email: email,
                        firebaseUID: user.uid,
                    });

                    router.replace('/profile');

                } catch (error: any) {
                    console.error(error);

                    // If Stripe customer creation fails, delete the Firebase user
                    try {
                        await deleteUser(user);
                        console.log("Firebase user deleted successfully.");
                    } catch (deleteError: any) {
                        console.error("Error deleting Firebase user:", deleteError);
                        Alert.alert('Error', 'Failed to cleanup account creation. Please contact support.');
                    }

                    if (error.code === 'functions/invalid-argument') {
                        Alert.alert('Error', 'Invalid data provided for customer creation.');
                    } else if (error.code === 'stripe/card-error') {
                        Alert.alert('Card Error', error.details.message || 'An error occurred with your card.');
                    } else if (error.code === 'firestore/permission-denied') {
                        Alert.alert('Permission Error', 'You do not have permission to perform this action.');
                    } else {
                        Alert.alert('Error', 'Failed to create your account. Please try again later.');
                    }
                }
            }

        } catch (error: any) {
            console.error("Error during signup:", error);
            Alert.alert('Signup Error', error.message);
        } finally {
            setLoading(false);
        }
    };


    // const signUp = async () => {
    //     setLoading(true);
    //     try {
    //         await auth().createUserWithEmailAndPassword(email, password);
    //         alert('Check your emails!');
    //         router.replace('/profile');
    //     } catch (e: any) {
    //         const err = e as FirebaseError;
    //         alert('Registration failed: ' + err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const signIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                router.replace('/home');
            }
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Password"
                />
                {loading ? (
                    <ActivityIndicator size={'small'} style={{ margin: 28 }} />
                ) : (
                    <>
                        <Button onPress={signIn} title="Login" />
                        <Button onPress={signUp} title="Create account" />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}


export default AuthIndex;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});