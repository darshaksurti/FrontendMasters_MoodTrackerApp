import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MoodOptionType } from "../types";

const moodOptions: MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
    const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();

    return (
        <View style={styles.moodOptions}>
            {moodOptions.map(option => (
                <View>
                    <Pressable
                        onPress={() => setSelectedMood(option)}
                        style={[
                            styles.moodItem,
                            selectedMood?.emoji === option.emoji ? styles.selectedMoodItem : undefined,
                        ]}>
                        <Text key={option.emoji}>
                            {option.emoji}
                        </Text>
                    </Pressable>
                    <Text style={styles.descriptionText}>
                        {option.emoji === selectedMood?.emoji ? option.description : undefined}
                    </Text>
                </View>
            ))
            }
        </View >
    )
}

const styles = StyleSheet.create({
    moodOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    moodItem: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    selectedMoodItem: {
        backgroundColor: '#454C73',
        borderColor: 'white',
        borderWidth: 2,
    },
    descriptionText: {
        color: '#454C73',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10,
    }
})