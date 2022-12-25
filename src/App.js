import { cloneDeep } from "lodash";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
    completeTour,
    makeFen,
    makeNumber,
    makeStrCoord,
    sqToFen,
    updateFen,
    updateValids,
    initValids,
    genArrows,
} from "./tour";
import CompletedPanel from "./CompletedPanel";

function App() {
    const [isFirst, setIsFirst] = useState(true);

    const [tour, setTour] = useState({
        fen: "8/8/8/8/8/8/8/8",
        visited: [],
        visitedStr: [],
        validMoves: [],
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

    //this is broken
    const undo = () => {
        lastTour !== null ? setTour(lastTour) : setLastTour(null);
        setImpossible(false);
    };

    const dropPiece = (square) => {
        if (isFirst) {
            setIsFirst(false);
            const newTour = cloneDeep(tour);

            const init = sqToFen(square);
            const initSq = 8 * init.rank + init.file;
            const initSqStr = makeStrCoord(init.rank, init.file);

            newTour.visited = [...newTour.visited, initSq];
            newTour.visitedStr = [...newTour.visitedStr, initSqStr];
            newTour.validMoves = initValids(square, makeNumber(square));
            newTour.fen = init.fen;
            setTour(newTour);
        } else {
            return null;
        }
    };

    const randomStart = () => {
        if (isFirst) {
            setIsFirst(false);
            const newTour = cloneDeep(tour);

            const init = makeFen();
            const initSq = 8 * init.rank + init.file;
            const initSqStr = makeStrCoord(init.rank, init.file);

            newTour.fen = init.fen;
            newTour.visited = [initSq];
            newTour.visitedStr = [initSqStr];
            newTour.validMoves = initValids(initSqStr, initSq);
            setTour(newTour);
        }
    };

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
                customArrows={arrows}
                onSquareClick={dropPiece}
            />
            <button onClick={finishTour}>Complete Tour</button>
            <button onClick={undo}>Undo</button>
            <button onClick={() => setArrows(genArrows(tour.visitedStr))}>
                Show path
            </button>
            {isFirst ? (
                <button onClick={randomStart}>Random Start</button>
            ) : null}
            <CompletedPanel tour={tour} impossible={impossible} />
        </div>
    );
}

export default App;
