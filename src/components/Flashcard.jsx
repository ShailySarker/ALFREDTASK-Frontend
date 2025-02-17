import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateFlashcard } from "../redux/slices/flashcardSlice";
import { motion } from "framer-motion";

const Flashcard = ({ card }) => {
  const dispatch = useDispatch();
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-lg font-bold">{card.question}</p>
      {showAnswer && <p className="text-md text-gray-700 mt-2">{card.answer}</p>}
      
      <button className="btn mt-2" onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
      
      <div className="flex gap-2 mt-4">
        <button className="btn bg-green-500 text-white" onClick={() => dispatch(updateFlashcard({ id: card._id, correct: true }))}>Got it Right</button>
        <button className="btn bg-red-500 text-white" onClick={() => dispatch(updateFlashcard({ id: card._id, correct: false }))}>Got it Wrong</button>
      </div>
    </motion.div>
  );
};

export default Flashcard;
