import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Tour } from "./tour";
import { cloneDeep } from "lodash";

function App() {
    const [tour, setTour] = useState(new Tour());

    const onDrop = (src, tgt, piece) => {
        console.log(`${piece} from ${src} to ${tgt}`);

        const tourCopy = cloneDeep(tour);
        tourCopy.move(piece, tgt);

        setTour(tourCopy);
    };

    const isDraggable = (piece) => (piece.piece === "wN" ? true : false);

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                onPieceDrop={onDrop}
                isDraggablePiece={isDraggable}
            />
        </div>
    );
}

export default App;
