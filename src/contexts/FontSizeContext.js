import React, { createContext, useState, useContext } from 'react';

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
    const [fontSize, setFontSize] = useState(1); // Default font size multiplier is 1

    const increaseFontSize = () => {
        setFontSize(prevSize => {
            const newSize = prevSize + 0.1;
            return newSize > 1.5 ? 1.5 : newSize; // Maximum 1.5 times
        });
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => {
            const newSize = prevSize - 0.1;
            return newSize < 0.8 ? 0.8 : newSize; // Minimum 0.8 times
        });
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
}

export function useFontSize() {
    return useContext(FontSizeContext);
}