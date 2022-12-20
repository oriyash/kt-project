import { cloneDeep } from "lodash";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
    completeTour,
    makeFen,
    makeNumber,
    makeStrCoord,
    updateValids,
    updateFen,
    initValids,
} from "./tour";
import CompletedPanel from "./CompletedPanel";

function App() {
    const init = makeFen();
    const initSq = 8 * init.rank + init.file;
    const initSqStr = makeStrCoord(init.rank, init.file);

    const [tour, setTour] = useState({
        fen: init.fen,
        visited: [initSq],
        visitedStr: [initSqStr],
        validMoves: initValids(initSqStr, initSq),
        completed: null,
    });

    const [lastTour, setLastTour] = useState(null);

    const isDraggable = (piece) => (piece.piece === "wN" ? true : false);

    const onDrop = (srcSt, tgtSt, piece) => {
        // console.log(`${piece} from ${srcSt} to ${tgtSt}`);

        const tgt = makeNumber(tgtSt);

        if (piece === "wN" && tour.validMoves.includes(tgt)) {
            const newTour = cloneDeep(tour);

            newTour.visited = [...newTour.visited, tgt];
            newTour.visitedStr = [...newTour.visitedStr, tgtSt];
            newTour.validMoves = updateValids(tour, tgtSt, tgt);
            newTour.fen = updateFen(newTour.visited);
            // console.log(newTour);
            setLastTour(tour);
            setTour(newTour);
            return true;
        } else {
            return false;
        }
    };

    const onClick = () => {
        console.log(tour);
        const newTour = completeTour(tour);
        console.log(newTour);
    };

    const undo = () => {
        lastTour !== null ? setTour(lastTour) : null;
    };

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
            />
            <button onClick={onClick}>completeTour</button>
            <button onClick={undo}>undo</button>
            <CompletedPanel />
        </div>
    );
}

export default App;
