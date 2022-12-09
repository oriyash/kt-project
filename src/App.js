import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Tour } from "./tour";
function App() {
    const [tour, setTour] = useState(new Tour());

    const onDrop = (src, tgt) => {
        console.log(`from ${src} to ${tgt}`);

        const move = tour.move(tgt);

        console.log(tour.visited);
        console.log(tour.validMoves);

        // console.log(makeNumber(tgt));

        // const tourCopy = { ...tour };
        // console.log(tourCopy);

        setTour(tour);
        return move;
    };

    // console.log(tour.visited);
    // console.log(tour.validMoves);

    // console.(tour.fen);

    return (
        <div id="app">
            <Chessboard position={tour.fen} onPieceDrop={onDrop} />
        </div>
    );
}

export default App;
