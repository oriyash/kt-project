import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
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
    findBestMove,
} from "./tour";
import Moves from "./Moves";
import "./App.css";
import { Container } from "@mui/system";
import {
    Button,
    ButtonGroup,
    FormControlLabel,
    Grid,
    Switch,
} from "@mui/material";
import Status from "./Status";
import NavButton from "./NavButton";
import ProposedSolution from "./ProposedSolution";

function App() {
    const [isFirst, setIsFirst] = useState(true);

    const [tour, setTour] = useState({
        fen: "8/8/8/8/8/8/8/8",
        visited: [],
        visitedStr: [],
        validMoves: [],
        lastTour: null,
        completed: null,
    });

    const [arrows, setArrows] = useState([]);
    const [options, setOptions] = useState({});
    const [completed, setCompleted] = useState(false);
    const [showBest, setShowBest] = useState(false);

    useEffect(() => {
        if (tour.visited.length === 0) {
            setCompleted(false);
            setIsFirst(true);
        } else if (tour.visited.length === 64) {
            setCompleted(true);
        } else if (tour.validMoves.length === 0) {
            setCompleted(null);
        } else {
            setCompleted(false);
        }
    }, [tour]);

    const isDraggable = (piece) =>
        piece.piece === "wN" && tour.visited.length !== 64 && completed !== null
            ? true
            : false;

    const onDrop = (srcSt, tgtSt, piece) => {
        // console.log(`${piece} from ${srcSt} to ${tgtSt}`);

        const tgt = makeNumber(tgtSt);

        if (piece === "wN" && tour.validMoves.includes(tgt)) {
            const newTour = cloneDeep(tour);

            newTour.visited = [...newTour.visited, tgt];
            newTour.visitedStr = [...newTour.visitedStr, tgtSt];
            newTour.validMoves = updateValids(tour, tgtSt, tgt);
            newTour.fen = updateFen(newTour.visited);
            newTour.lastTour = cloneDeep(tour);
            newTour.lastTour.completed = null;
            newTour.completed = null;
            // console.log(newTour);
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

            newSquares[square] =
                validStr.length !== 0 || tour.visited.length === 64
                    ? { background: "rgba(255, 255, 0, 0.4)" }
                    : { background: "rgba(255,0, 0, 0.4)" };

            validStr.forEach((value) => {
                updateValids(tour, value, makeNumber(value)).length !== 0 ||
                tour.visited.length === 63
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

            const bestMove = getSq(findBestMove(tour));
            if (bestMove !== null && showBest) {
                if (
                    newSquares[bestMove].background !==
                        "radial-gradient(circle, rgba(255,0,0,0.4) 25%, transparent 25%)" &&
                    newSquares[bestMove].background !== "rgba(255,0, 0, 0.4)"
                ) {
                    newSquares[bestMove] = {
                        background:
                            "radial-gradient(circle, rgba(0,255,0,0.4) 25%, transparent 25%)",
                    };
                }
            }
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
            setCompleted(null);
        }
    };

    const reset = () => {
        setTour({
            fen: "8/8/8/8/8/8/8/8",
            visited: [],
            visitedStr: [],
            validMoves: [],
            lastTour: null,
            completed: null,
        });
    };

    const undo = () => {
        if (tour.lastTour !== null) {
            setTour(tour.lastTour);
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
                newTour.visited = visiteds[fens.indexOf(fen)];
                newTour.visitedStr = newTour.visited.map((val) => getSq(val));
                newTour.validMoves = updateValids(
                    newTour,
                    newTour.visitedStr.slice(-1)[0],
                    newTour.visited.slice(-1)[0]
                );
                newTour.fen = fen;
                // console.log(newTour);
                setTour(newTour);
                await timer(500);
            }
        }
    };

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    return (
        <Container className="container">
            <Grid container>
                <Grid item xs={12} md={6} lg={6}>
                    <Chessboard
                        position={tour.fen}
                        isDraggablePiece={isDraggable}
                        onPieceDrop={onDrop}
                        customArrows={arrows}
                        onSquareClick={dropPiece}
                        onMouseOverSquare={mouseOver}
                        onMouseOutSquare={mouseOut}
                        customSquareStyles={{ ...options }}
                        customBoardStyle={{
                            borderRadius: "4px",
                            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                        }}
                        customDarkSquareStyle={{ background: "#4D4D4D" }}
                        customLightSquareStyle={{ background: "#FFF4E0" }}
                    />
                    <ButtonGroup
                        variant="contained"
                        className="controls"
                        // orientation="vertical"
                    >
                        {isFirst ? (
                            <Button onClick={randomStart}>Random Start</Button>
                        ) : null}

                        {isFirst ? (
                            <NavButton to={"/rules"}>Tutorial</NavButton>
                        ) : null}

                        {tour.visited.length !== 0 &&
                        !(
                            tour.completed !== null ||
                            tour.visited.length === 64
                        ) ? (
                            <Button onClick={finishTour}>Complete Tour</Button>
                        ) : null}

                        {tour.completed !== null ? (
                            <Button onClick={visualiseComplete}>
                                Visualise
                            </Button>
                        ) : null}

                        {tour.visited.length > 1 ? (
                            <Button
                                onClick={() =>
                                    setArrows(genArrows(tour.visitedStr))
                                }
                            >
                                Show path
                            </Button>
                        ) : null}

                        {1 < tour.visited.length && tour.visited.length < 64 ? (
                            <Button onClick={undo}>Undo</Button>
                        ) : null}

                        {tour.visited.length !== 0 ? (
                            <Button onClick={reset}>Reset</Button>
                        ) : null}
                    </ButtonGroup>
                    <FormControlLabel
                        label="Show least degree move"
                        control={
                            <Switch
                                onChange={() => {
                                    setShowBest(!showBest);
                                }}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} id="right">
                    <Status tour={tour} completed={completed} />
                    <Moves tour={tour} />
                    <ProposedSolution tour={tour} />
                    <NavButton to="/simulation">Simulate!</NavButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
