import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Flashcard from "../../../components/Flashcard";
import { fetchFlashcards } from "../../../redux/slices/flashcardSlice";

const FlashcardsPage = () => {
  const dispatch = useDispatch();
  const { flashcards } = useSelector(state => state?.flashcards);

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Flashcards</h1>
      <div className="grid gap-4">
        {flashcards?.map(card => <Flashcard key={card?._id} card={card} />)}
      </div>
    </div>
  );
};

export default FlashcardsPage;
