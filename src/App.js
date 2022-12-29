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
    getSq,
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
    const [options, setOptions] = useState({});

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

    const mouseOver = (square) => {
        if (square === tour.visitedStr.slice(-1)[0]) {
            const validStr = tour.validMoves.map((value) => getSq(value));
            const newSquares = {};

            newSquares[square] = validStr.length
                ? { background: "rgba(255, 255, 0, 0.4)" }
                : { background: "rgba(255,0, 0, 0.4)" };

            validStr.forEach((value) => {
                updateValids(tour, value, makeNumber(value)).length !== 0
                    ? (newSquares[value] = {
                          background:
                              "radial-gradient(circle, rgba(0,0,0,.2) 25%, transparent 25%)",
                          borderRadius: "50%",
                      })
                    : (newSquares[value] = {
                          background:
                              "radial-gradient(circle, rgba(255,0,0,0.4) 25%, transparent 25%)",
                      });
            });

            setOptions(newSquares);
        }
    };

    const mouseOut = () => {
        if (Object.keys(options).length !== 0) setOptions({});
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

    const reset = () => {
        setTour({
            fen: "8/8/8/8/8/8/8/8",
            visited: [],
            visitedStr: [],
            validMoves: [],
            completed: null,
        });
        setLastTour(null);
        setIsFirst(true);
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

    const visualiseComplete = async () => {
        // console.log(tour);
        if (tour.completed !== null) {
            let visiteds = [];

            for (let i = tour.visited.length; i < 65; i++) {
                visiteds.push([...tour.completed.visited.slice(0, i)]);
            }

            let fens = visiteds.map((val) => updateFen(val));

            for (let fen of fens) {
                const newTour = cloneDeep(tour);
                newTour.fen = fen;
                setTour(newTour);
                await timer(500);
            }
        }
    };

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    return (
        <div id="app">
            <Chessboard
                position={tour.fen}
                isDraggablePiece={isDraggable}
                onPieceDrop={onDrop}
                customArrows={arrows}
                onSquareClick={dropPiece}
                onMouseOverSquare={mouseOver}
                onMouseOutSquare={mouseOut}
                customSquareStyles={{ ...options }}
            />
            <button onClick={finishTour}>Complete Tour</button>
            <button onClick={undo}>Undo</button>
            <button onClick={() => setArrows(genArrows(tour.visitedStr))}>
                Show path
            </button>
            {isFirst ? (
                <button onClick={randomStart}>Random Start</button>
            ) : null}
            {tour.completed !== null ? (
                <button onClick={visualiseComplete}>Visualise</button>
            ) : null}
            {tour.visited.length !== 0 ? (
                <button onClick={reset}>Reset</button>
            ) : null}
            <CompletedPanel tour={tour} impossible={impossible} />
        </div>
    );
}

export default App;
