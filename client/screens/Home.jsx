import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { UserContext } from '../context/User';
import UnifiedView from '../components/UnifiedView';

export default function HomeScreen() {
    const {user, setUser} = useContext(UserContext);

    return (
        <UnifiedView style={styles.container}>
            <Text style={styles.welcometext}>Welcome {user?.firstName}!</Text>
            <Text>Here's a quick summary of things to keep an eye on...</Text>

            <View>
                <Text>Todos</Text>
                <Text>You have X tasks due in within the next week!</Text>
                <Text>You have completed X tasks!</Text>
            </View>

            <View>
                <Text>Habits</Text>
            </View>
        </UnifiedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12
    },
    welcometext: {
        fontSize: 32
    }
})