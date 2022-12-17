import { cloneDeep } from "lodash";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
    makeNumber,
    makeStrCoord,
    sqToFen,
    updateFen,
    updateValids,
} from "./tour";

function App() {
    const [isFirst, setIsFirst] = useState(true);

    const [tour, setTour] = useState({
        fen: "8/8/8/8/8/8/8/8",
        visited: [],
        visitedStr: [],
        validMoves: [],
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
            newTour.validMoves = updateValids(tgtSt, tgt).filter(
                (val) => !newTour.visited.includes(val)
            );
            newTour.fen = updateFen(newTour.visited);
            console.log(newTour);
            setTour(newTour);
            return true;
        } else {
            return false;
        }
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
            newTour.validMoves = updateValids(square, makeNumber(square));
            newTour.fen = init.fen;
            setTour(newTour);
        } else {
            return null;
        }
    };

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
                onSquareClick={dropPiece}
            />
        </div>
    );
}

export default App;
