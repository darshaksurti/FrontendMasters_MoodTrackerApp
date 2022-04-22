import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { theme } from "../theme";
import { MoodOptionType } from "../types";
import Reanimated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const imageSrc = require('../../assets/butterflies.png');

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

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
    const [hasSelected, setHasSelected] = React.useState(false);

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: selectedMood ? withTiming(1) : withTiming(0.5),
        transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }]
    }), [selectedMood]);

    const handleSelect = React.useCallback(() => {
        if (selectedMood) {
            handleSelectMood(selectedMood);
            setSelectedMood(undefined);
            setHasSelected(true);
        }
    }, [handleSelectMood, selectedMood]);

    if (hasSelected) {
        return (
            <View style={styles.container}>
                <Image source={imageSrc} style={styles.image} />
                <Pressable
                    style={styles.button}
                    onPress={() => setHasSelected(false)}>
                    <Text style={styles.buttonText}>Choose another!</Text>
                </Pressable>
            </View>
        )
    }

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
            <ReanimatedPressable
                style={[styles.button, buttonStyle]}
                onPress={handleSelect}>
                <Text style={styles.buttonText}>Choose</Text>
            </ReanimatedPressable>
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
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 250,
        justifyContent: "space-between",
    },
    headingText: {
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: 20,
        color: theme.colorWhite,
        fontFamily: theme.fontFamilyBold,
    },
    button: {
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: theme.colorPurple,
        width: 150,
        alignSelf: 'center',
        padding: 10,
    },
    buttonText: {
        color: theme.colorWhite,
        fontFamily: theme.fontFamilyBold,
        textAlign: 'center',
    },
    moodOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    moodItem: {
        height: 50,
        width: 50,
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
        fontFamily: theme.fontFamilyBold,
        textAlign: 'center',
        fontSize: 10,
    },
    emojiSize: {
        fontSize: 30,
    },
    image: {
        alignSelf: 'center',
    }
})