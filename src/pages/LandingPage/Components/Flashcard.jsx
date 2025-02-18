import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { markCorrect, markIncorrect, nextFlashcard } from "../../../redux/slices/flashcardSlice";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { deleteFlashcard } from "../../../redux/apis/flashcardCalls";
import { MdDeleteForever } from "react-icons/md";

const Flashcard = () => {
    const dispatch = useDispatch();
    const { flashcards, currentIndex, showSuccessMessage } = useSelector((state) => state?.flashcards);
    const [showAnswer, setShowAnswer] = useState(false);

    if (showSuccessMessage) {
        return <h2 className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] text-center flex justify-center items-center xl:text-2xl lg:text-xl text-lg font-bold text-green-500">🎉 Congratulations! You've completed all 5 boxes! 🎉</h2>;
    }

    if (flashcards?.length === 0) {
        return <h2 className="text-xl font-bold">No more flashcards to show.</h2>;
    }

    
    const handleDelete = async () => {
        await deleteFlashcard(dispatch, flashcards[currentIndex]?._id);
        window.location.reload();
    };

    if (flashcards?.length === 0) return <p>No flashcards available.</p>;

    const flashcard = flashcards[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] flex flex-col justify-center items-center"
        >
            <div className="rounded-3xl border-2 shadow mx-auto md:p-12 p-6 flex flex-col justify-center items-center gap-10">
                <h3 className="md:text-xl text-lg font-semibold mb-4 text-center">{flashcard?.question}</h3>
                <div className="mt-5 w-full">
                    <div>
                        {showAnswer && <p className="mb-4 md:text-lg text-base font-medium">Answer: {flashcard?.answer}</p>}
                        <button onClick={() => setShowAnswer(!showAnswer)}
                            className="flex items-center justify-center gap-3 bg-[#025195] xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl w-full text-center">
                            {showAnswer ? "Hide Answer" : "Show Answer"}
                            {showAnswer ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex space-x-4 mt-5 w-full">
                        <button onClick={() => { dispatch(markCorrect()); dispatch(nextFlashcard()); }} className="flex items-center justify-center gap-3 bg-green-600 xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl w-full text-center">
                            Got it right <FaCheck />
                        </button>
                        <button onClick={() => dispatch(markIncorrect())} className="bg-red-600 xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl w-full text-center">
                            Got it wrong  X
                        </button>
                    </div>
                    <div className="flex items-center gap-3 mt-12">
                        <p>Want to delete this question? </p>
                        <button onClick={handleDelete} className="flex items-center gap-2 justify-center bg-amber-500 xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl lg:w-32 md:w-32 w-28 text-center">
                            Delete <MdDeleteForever />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Flashcard;