import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { theme } from "../theme";
import { MoodOptionType } from "../types";

const moodOptions: MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
    handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
    const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();

    const handleSelect = React.useCallback(() => {
        if (selectedMood) {
            handleSelectMood(selectedMood);
            setSelectedMood(undefined);
        }
    }, [handleSelectMood, selectedMood]);

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>How are you right now?</Text>
            <View style={styles.moodOptions}>
                {moodOptions.map(option => (
                    <View key={option.emoji}>
                        <Pressable
                            onPress={() => setSelectedMood(option)}
                            style={[
                                styles.moodItem,
                                selectedMood?.emoji === option.emoji ? styles.selectedMoodItem : undefined,
                            ]}>
                            <Text key={option.emoji} style={styles.emojiSize}>
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
            <Pressable
                style={styles.button}
                onPress={handleSelect}>
                <Text style={styles.buttonText}>Choose</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colorPurple,
        padding: 20,
        margin: 10,
    },
    headingText: {
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 20,
    },
    button: {
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: theme.colorPurple,
        width: 150,
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
    },
    buttonText: {
        color: theme.colorWhite,
        fontWeight: 'bold',
        textAlign: 'center',
    },
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
    },
    emojiSize: {
        fontSize: 30,
    }
})