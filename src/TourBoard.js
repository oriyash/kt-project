import { Chessboard } from "react-chessboard";
import { Tour } from "./tour/tour";

export default function TourBoard() {
    const tour = new Tour();

    // create TourBoard Component
    return (
        <>
            <Chessboard position={tour.fen} onPieceDrop={tour.onDrop} />
            <button onClick={() => console.log(tour.visited)}>
                See visited
            </button>
        </>
    );
}
