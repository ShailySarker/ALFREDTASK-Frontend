import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
    name: "flashcards",
    initialState: {
        flashcards: [],
        currentIndex: 0,
        completedBoxes: [],
        showSuccessMessage: false,
        isFetching: false,
        error: null,
    },
    reducers: {
        setFlashcards: (state, action) => {
            state.flashcards = action.payload.map(flash => ({ ...flash, box: 1 })); // Default box = 1
            state.currentIndex = 0;
            state.completedBoxes = [];
            state.showSuccessMessage = false;
        },
        addFlashcardSuccess: (state, action) => {
            state.flashcards.push(action.payload);
            state.showSuccessMessage = false;
        },
        deleteFlashcardSuccess: (state, action) => {
            state.flashcards = state.flashcards.filter((f) => f._id !== action.payload);
            state.showSuccessMessage = false;
        },
        nextFlashcard: (state) => {
            if (state.currentIndex < state.flashcards.length - 1) {
                state.currentIndex += 1; // Move to the next flashcard
            } else {
                state.showSuccessMessage = true; // If all are completed
            }
        },
        markCorrect: (state) => {
            const currentCard = state.flashcards[state.currentIndex];
            if (currentCard.box < 5) {
                currentCard.box += 1; // Move to the next box
            }

            // Ensure completedBoxes only stores unique values
            if (!state.completedBoxes.includes(currentCard.box)) {
                state.completedBoxes.push(currentCard.box);
            }

            if (state.completedBoxes.length === 5) {
                state.showSuccessMessage = true;
            } else {
                state.currentIndex = (state.currentIndex + 1) % state.flashcards.length;
            }
        },
        markIncorrect: (state) => {
            state.flashcards[state.currentIndex].box = 1; // Reset box to 1
            state.completedBoxes = state.completedBoxes.filter(box => box !== 1); // Remove box 1 from completed
            state.currentIndex = 0; // Reset to first flashcard
        },
        flashcardStart: (state) => {
            state.isFetching = true;
            state.error = null;
            state.showSuccessMessage = false;
        },
        flashcardSuccess: (state, action) => {
            state.isFetching = false;
            state.flashcards = action.payload;
            state.showSuccessMessage = false;
        },
        flashcardFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.showSuccessMessage = false;
        },
    },
});

export const {
    setFlashcards,
    addFlashcardSuccess,
    deleteFlashcardSuccess,
    nextFlashcard,
    markCorrect,
    markIncorrect,
    flashcardStart,
    flashcardSuccess,
    flashcardFailure,
} = flashcardSlice.actions;

export default flashcardSlice.reducer;