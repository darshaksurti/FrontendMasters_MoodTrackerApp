import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MoodPicker } from "../components/MoodPicker";
import { MoodOptionType, MoodOptionWithTimestamp } from "../types";

export const Home: React.FC = () => {
    const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

    const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
        setMoodList(current => [...current, { mood: selectedMood, timestamp: Date.now() }])
    }, []);

    return (
        <View style={styles.container}>
            <MoodPicker handleSelectMood={handleSelectMood} />
            {moodList.map(item => (
                <Text key={item.timestamp}>
                    {item.mood.emoji} {new Date(item.timestamp).toString()}
                </Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})