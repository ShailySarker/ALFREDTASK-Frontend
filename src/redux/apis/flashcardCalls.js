import { userRequest } from "../../helpers/axois/requestMethod";
import { addFlashcardSuccess, deleteFlashcardSuccess, flashcardFailure, flashcardStart, flashcardSuccess, setFlashcards } from "../slices/flashcardSlice";

export const getFlashcards = async (dispatch) => {
    dispatch(flashcardStart());
    try {
        const res = await userRequest.get('/flashcards');
        dispatch(flashcardSuccess(res?.data?.data.slice(0,5)));
    } catch (error) {
        dispatch(flashcardFailure(error?.message));
    }
};

export const createFlashcard = async (dispatch, flashcardData) => {
    dispatch(flashcardStart());
    try {
        const res = await userRequest.post('/flashcards', flashcardData);
        dispatch(addFlashcardSuccess(res.data.data)); // Dispatch the add action
    } catch (error) {
        dispatch(flashcardFailure(error?.message));
    }
};

export const updateFlashcard = async (dispatch, flashcardId, correct) => {
    dispatch(flashcardStart());
    try {
        const res = await userRequest.put(`/flashcards/${flashcardId}`, { correct });
        dispatch(setFlashcards(res?.data?.data));
    } catch (error) {
        dispatch(flashcardFailure(error?.message));
    }
};

export const deleteFlashcard = async (dispatch, flashcardId) => {
    dispatch(flashcardStart());
    try {
        await userRequest.delete(`/flashcards/${flashcardId}`);
        dispatch(deleteFlashcardSuccess(flashcardId)); // Dispatch the delete action
    } catch (error) {
        dispatch(flashcardFailure(error?.message));
    }
};