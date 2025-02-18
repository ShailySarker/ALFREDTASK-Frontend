import { useSelector } from "react-redux";

const Progress = () => {
    const { flashcards, completedBoxes } = useSelector((state) => state?.flashcards);
    console.log(flashcards)
    return (
        <div className="text-center">
            {/* <h2 className="text-lg font-medium">You have {flashcards?.length} flashcards due today</h2> */}
            <p className="font-medium">Progress: {completedBoxes?.length} of {flashcards?.length} boxes completed</p>
        </div>
    );
};

export default Progress;