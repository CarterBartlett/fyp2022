import React, { useContext } from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { UserContext } from '../context/User';

export default function HomeScreen() {
    const {user, setUser} = useContext(UserContext);

    return (
        <SafeAreaView>
            <ScrollView>
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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    welcometext: {
        fontSize: 32
    }
})