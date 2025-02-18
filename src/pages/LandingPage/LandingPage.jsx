import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlashcards } from "../../redux/apis/flashcardCalls";
import AddFlashcard from "./Components/AddFlashCard";
import Flashcard from "./Components/Flashcard";
import Progress from "../../components/Progress";
import { div } from "framer-motion/client";


const LandingPage = () => {
    const dispatch = useDispatch();
    const { flashcards, isFetching, error } = useSelector((state) => state?.flashcards);
    const userInfo = useSelector(state => state?.user?.currentUser);
    const [showAddFlashcard, setShowAddFlashcard] = useState(false);

    useEffect(() => {
        dispatch(getFlashcards);
    }, [dispatch]);


    if (isFetching) return <div className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] flex justify-center items-center xl:text-3xl md:text-2xl text-xl font-semibold">Loading...</div>;
    // if (error) return <div className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] flex justify-center items-center xl:text-3xl md:text-2xl text-xl font-semibold">{error}</div>;

    return (
        <div >
            {
                userInfo &&
                <div className="mx-auto p-4">
                    <h1 className="text-xl font-semibold text-center">Welcome to today's task, <span className="border-b-2">{userInfo?.fullname}</span></h1>
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col gap-3 items-center">
                            <Progress count={flashcards?.length} />
                            {flashcards?.length > 0 && <button
                                onClick={() => setShowAddFlashcard(prev => !prev)}
                                className={`xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl lg:w-36 w-32 text-center ${showAddFlashcard ? "bg-yellow-500" : "bg-[#025195]"}`}>
                                {showAddFlashcard ? "Hide Flashcard" : "Add Flashcard"}
                            </button>
                            }
                            {(flashcards?.length
                                === 0 && showAddFlashcard == false) && <div className="xl:h-[550px] lg:h-[450px] md:h-[600px] h-[400px] flex flex-col xl:gap-8 lg:gap-6 md:gap-5 gap-4 justify-center items-center ">
                                    <p className="xl:text-3xl md:text-2xl text-xl font-semibold">No flashcard is available now, kindly add ones!</p>
                                    <button
                                        onClick={() => setShowAddFlashcard(prev => !prev)}
                                        className={`xl:py-[9px] lg:py-2 py-[6px] text-white shadow-lg font-medium rounded-xl lg:w-36 w-32 text-center ${showAddFlashcard ? "bg-yellow-500" : "bg-[#025195]"}`}>
                                        {showAddFlashcard ? "Hide Flashcard" : "Add Flashcard"}
                                    </button>
                                </div>

                            }
                        </div>
                        {showAddFlashcard && (
                            <AddFlashcard
                                onAdd={() => {
                                    getFlashcards(dispatch);
                                    setShowAddFlashcard(false);
                                }}
                                onClose={() => setShowAddFlashcard(false)}
                            />
                        )}
                        {(flashcards?.length > 0 && showAddFlashcard === false) && <Flashcard />}
                    </div>
                </div>
            }
        </div>
    );
};

export default LandingPage;