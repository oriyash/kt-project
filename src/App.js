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
    genArrows,
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
    const [impossible, setImpossible] = useState(false);
    const [arrows, setArrows] = useState([]);

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

    const finishTour = () => {
        const completed = completeTour(tour);

        if (completed !== null) {
            const newTour = cloneDeep(tour);
            newTour.completed = completed;
            setTour(newTour);
        } else {
            setImpossible(true);
        }
    };

    const undo = () => {
        lastTour !== null ? setTour(lastTour) : setLastTour(null);
        setImpossible(false);
    };

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
                customArrows={arrows}
            />
            <button onClick={finishTour}>Complete Tour</button>
            <button onClick={undo}>Undo</button>
            <button onClick={() => setArrows(genArrows(tour.visitedStr))}>
                Show path
            </button>
            <CompletedPanel tour={tour} impossible={impossible} />
        </div>
    );
}

export default App;
