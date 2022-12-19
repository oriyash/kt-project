import { cloneDeep } from "lodash";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
    makeFen,
    makeNumber,
    makeStrCoord,
    updateValids,
    updateFen,
    initValids,
} from "./tour";

function App() {
    const init = makeFen();
    const initSq = 8 * init.rank + init.file;
    const initSqStr = makeStrCoord(init.rank, init.file);

    const [tour, setTour] = useState({
        fen: init.fen,
        visited: [initSq],
        visitedStr: [initSqStr],
        validMoves: initValids(initSqStr, initSq),
    });

    // console.log(tour.test());

    const isDraggable = (piece) => (piece.piece === "wN" ? true : false);

    const onDrop = (srcSt, tgtSt, piece) => {
        console.log(`${piece} from ${srcSt} to ${tgtSt}`);

        const tgt = makeNumber(tgtSt);

        if (piece === "wN" && tour.validMoves.includes(tgt)) {
            const newTour = cloneDeep(tour);

            newTour.visited = [...newTour.visited, tgt];
            newTour.visitedStr = [...newTour.visitedStr, tgtSt];
            newTour.validMoves = updateValids(tour, tgtSt, tgt);
            newTour.fen = updateFen(newTour.visited);
            console.log(newTour);
            setTour(newTour);
            return true;
        } else {
            return false;
        }
    };

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
            />
        </div>
    );
}

export default App;
