import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Tour, makeNumber } from "./tour";
function App() {
    const [tour, setTour] = useState(new Tour());

    const onDrop = (src, tgt) => {
        console.log(`from ${src} to ${tgt}`);

        tour.visited.push(makeNumber(tgt));
        console.log(tour.visited);
        // console.log(makeNumber(tgt));

        // const tourCopy = { ...tour };
        // console.log(tourCopy);

        setTour(new Tour());
    };

    console.log(tour.fen);

    return (
        <div id="app">
            <Chessboard position={tour.fen} onPieceDrop={onDrop} />
        </div>
    );
}

export default App;
