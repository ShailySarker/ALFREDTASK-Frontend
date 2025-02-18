import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFlashcard } from "../../../redux/apis/flashcardCalls";
import { motion } from "framer-motion";

const AddFlashcard = ({ onAdd }) => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createFlashcard(dispatch, { question, answer });
            setQuestion("");
            setAnswer("");
            onAdd(); // Refresh the flashcards list
        } catch (error) {
            console.error("Error creating flashcard:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] flex flex-col justify-center items-center"
        >
            <form onSubmit={handleSubmit} className="rounded-3xl border-2 shadow xl:w-[50%] lg:w-[60%] md:w-[70%] w-full mx-auto md:p-12 p-6 flex flex-col justify-center items-center gap-3">
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e?.target?.value)}
                    className="bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] px-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium w-full" required
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e?.target?.value)}
                    className="bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] px-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium w-full" required
                />
                <button type="submit" className="mt-6 bg-[#025195] xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl w-full text-center">
                    Add Flashcard
                </button>
            </form>
        </motion.div>
    );
};

export default AddFlashcard;