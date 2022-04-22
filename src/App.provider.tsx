import React from "react";
import { createContext } from "react";
import { MoodOptionType, MoodOptionWithTimestamp } from "./types";

type AppContextType = {
    moodList: MoodOptionWithTimestamp[];
    handleSelectMood: (mood: MoodOptionType) => void;
}

const AppContext = createContext<AppContextType>({
    moodList: [],
    handleSelectMood: () => { },
});

export const AppProvider: React.FC = ({ children }) => {
    const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

    const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
        setMoodList(current => [...current, { mood: selectedMood, timestamp: Date.now() }])
    }, []);

    return (
        <AppContext.Provider value={{ moodList, handleSelectMood }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => React.useContext(AppContext);