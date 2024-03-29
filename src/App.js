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
    Typography,
} from "@mui/material";
import Status from "./Status";
import ProposedSolution from "./ProposedSolution";
import IsClosable from "./IsClosable";
import Tutorial from "./Tutorial";

function App() {
    const [isFirst, setIsFirst] = useState(true);

    const [tour, setTour] = useState({
        fen: "8/8/8/8/8/8/8/8",
        visited: [],
        visitedStr: [],
        validMoves: [],
        lastTour: null,
        completed: undefined,
    });

    const [arrows, setArrows] = useState([]);
    const [options, setOptions] = useState({});
    const [completed, setCompleted] = useState(false);
    const [showBest, setShowBest] = useState(false);
    const [showPath, setShowPath] = useState(false);
    const [kq, setKq] = useState(false);
    const [firstLast, setFirstLast] = useState();
    const [visualising, setVisualising] = useState(false);
    const [tutorial, setTutorial] = useState(0);
    const [draw, setDraw] = useState(false);

    // const [tutorialProps, setTutorialProps] = useState({});

    /* eslint-disable*/
    useEffect(() => {
        if (tour.visited.length === 0) {
            setCompleted(false);
            setIsFirst(true);
            setFirstLast(undefined);
        } else if (tour.visited.length === 64) {
            setCompleted(true);
            setFirstLast({
                [tour.visitedStr[0]]: { background: "rgba(0,255,0,0.2)" },
                [tour.visitedStr.slice(-1)[0]]: {
                    background: "rgba(0,255,0,0.2)",
                },
            });
        } else if (tour.validMoves.length === 0) {
            setCompleted(null);
        } else {
            setCompleted(false);
            setIsFirst(false);
            setFirstLast(undefined);
            if (draw && !visualising) {
                setArrows(genArrows(tour.visitedStr));
            }
        }
    }, [tour]);

    useEffect(() => {
        if (!tutorial || tutorial === 1) {
            reset();
        }
    }, [tutorial]);

    useEffect(() => {
        if (tour.visited.length > 1) {
            const newTour = cloneDeep(tour);
            newTour.fen = updateFen(newTour.visited, kq);
            setTour(newTour);
        }
    }, [kq]);
    /* eslint-enable*/

    const isDraggable = (piece) =>
        piece.piece === "wN" &&
        tour.visited.length !== 64 &&
        completed !== null &&
        !visualising
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
            newTour.fen = updateFen(newTour.visited, kq);
            newTour.lastTour = cloneDeep(tour);

            if (newTour.completed && tgt === findBestMove(tour)) {
                newTour.completed = completeTour(newTour);
            } else {
                newTour.lastTour.completed = undefined;
                newTour.completed = undefined;
            }

            setTour(newTour);
            return true;
        } else {
            return false;
        }
    };

    const mouseOver = (square) => {
        if (!visualising) {
            if (!isFirst) {
                if (square === tour.visitedStr.slice(-1)[0]) {
                    const validStr = tour.validMoves.map((value) =>
                        getSq(value)
                    );
                    const newSquares = {};

                    newSquares[square] =
                        validStr.length !== 0 || tour.visited.length === 64
                            ? { background: "rgba(255, 255, 0, 0.4)" }
                            : { background: "rgba(255,0, 0, 0.4)" };

                    validStr.forEach((value) => {
                        updateValids(tour, value, makeNumber(value)).length !==
                            0 || tour.visited.length === 63
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
                            newSquares[bestMove].background !==
                                "rgba(255,0, 0, 0.4)"
                        ) {
                            newSquares[bestMove] = {
                                background:
                                    "radial-gradient(circle, rgba(0,255,0,0.4) 25%, transparent 25%)",
                            };
                        }
                    }
                    setOptions(newSquares);
                }
            } else {
                setOptions({
                    [square]: {
                        background: "rgba(0,255,0,0.4)",
                        cursor: "pointer",
                    },
                });
            }
        }
    };

    const mouseOut = async () => {
        if (Object.keys(options).length !== 0) {
            if (!isFirst) {
                await timer(1000);
            }
            setOptions({});
        }
    };

    const finishTour = () => {
        const completed = completeTour(tour);
        const newTour = cloneDeep(tour);
        newTour.completed = completed;
        setTour(newTour);
    };

    const reset = () => {
        setTour({
            fen: "8/8/8/8/8/8/8/8",
            visited: [],
            visitedStr: [],
            validMoves: [],
            lastTour: null,
            completed: undefined,
        });
    };

    const undo = () => {
        if (tour.lastTour !== null) {
            setTour(tour.lastTour);
        }
    };

    const onSquareClick = (square) => {
        const valids = tour.validMoves.map((value) => getSq(value));

        if (isFirst) {
            const newTour = cloneDeep(tour);

            const init = sqToFen(square);
            const initSq = 8 * init.rank + init.file;
            const initSqStr = makeStrCoord(init.rank, init.file);

            newTour.visited = [...newTour.visited, initSq];
            newTour.visitedStr = [...newTour.visitedStr, initSqStr];
            newTour.validMoves = initValids(square, makeNumber(square));
            newTour.fen = init.fen;
            setTour(newTour);
        } else if (valids.includes(square)) {
            onDrop(tour.visitedStr.slice(-1)[0], square, "wN");
        } else if (square === tour.visitedStr.slice(-1)[0]) {
            mouseOver(square);
        }
    };

    const randomStart = () => {
        if (isFirst) {
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
        if (tour.completed) {
            setVisualising(true);
            let visiteds = [];

            for (let i = tour.visited.length; i < 65; i++) {
                visiteds.push([...tour.completed.visited.slice(0, i)]);
            }

            let fens = visiteds.map((val) => updateFen(val, kq));

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
                if (showPath) {
                    setArrows(genArrows(newTour.visitedStr));
                }
                await timer(500);
            }
            setVisualising(false);
        }
    };

    const onPieceDragBegin = (piece, src) => {
        mouseOver(src);
        if (draw) {
            setArrows(genArrows(tour.visitedStr));
        }
    };

    const onPieceDragEnd = () => {
        if (Object.keys(options).length !== 0) {
            setOptions({});
        }
    };

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    return (
        <Container className="container">
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={6}>
                    <Chessboard
                        position={tour.fen}
                        isDraggablePiece={isDraggable}
                        onPieceDragBegin={onPieceDragBegin}
                        onPieceDragEnd={onPieceDragEnd}
                        onPieceDrop={onDrop}
                        customArrows={arrows}
                        onSquareClick={onSquareClick}
                        onMouseOverSquare={mouseOver}
                        onMouseOutSquare={mouseOut}
                        customSquareStyles={
                            tour.visited.length !== 64
                                ? { ...options }
                                : { ...options, ...firstLast }
                        }
                        customBoardStyle={boardTheme.customBoardStyle}
                        customDarkSquareStyle={boardTheme.customDarkSquareStyle}
                        customLightSquareStyle={
                            boardTheme.customLightSquareStyle
                        }
                    />

                    {!visualising ? (
                        <ButtonGroup
                            variant="contained"
                            className="controls"
                            // orientation="vertical"
                        >
                            {isFirst ? (
                                <Button onClick={randomStart}>
                                    Random Start
                                </Button>
                            ) : null}

                            {tour.visited.length !== 0 &&
                            !(
                                tour.completed ||
                                tour.visited.length === 64 ||
                                tour.validMoves.length === 0
                            ) ? (
                                <Button onClick={finishTour}>
                                    Complete Tour
                                </Button>
                            ) : null}

                            {tour.completed && tour.visited.length !== 64 ? (
                                <Button onClick={visualiseComplete}>
                                    Visualise
                                </Button>
                            ) : null}

                            {tour.visited.length > 1 &&
                            (!draw || completed || completed === null) ? (
                                <Button
                                    onClick={() =>
                                        setArrows(genArrows(tour.visitedStr))
                                    }
                                >
                                    Show path
                                </Button>
                            ) : null}

                            {1 < tour.visited.length &&
                            tour.visited.length < 64 ? (
                                <Button onClick={undo}>Undo</Button>
                            ) : null}

                            {tour.visited.length !== 0 ? (
                                <Button onClick={reset}>
                                    {tour.visited.length === 64
                                        ? "Play again"
                                        : "Reset"}
                                </Button>
                            ) : null}

                            {!tutorial && (
                                <Button
                                    onClick={() => setTutorial(tutorial + 1)}
                                >
                                    Tutorial
                                </Button>
                            )}
                        </ButtonGroup>
                    ) : null}
                    <div className="settings">
                        {!(visualising || completed) ? (
                            <FormControlLabel
                                checked={showBest}
                                label="Show least degree move"
                                control={
                                    <Switch
                                        onChange={() => {
                                            setShowBest(!showBest);
                                        }}
                                    />
                                }
                            />
                        ) : null}
                        {tour.completed && !(visualising || completed) ? (
                            <FormControlLabel
                                checked={showPath}
                                label="Show path when visualising"
                                control={
                                    <Switch
                                        onChange={() => {
                                            setShowPath(!showPath);
                                        }}
                                    />
                                }
                            />
                        ) : null}
                        {!visualising ? (
                            <FormControlLabel
                                checked={kq}
                                label="Use King/Queen"
                                control={<Switch onChange={() => setKq(!kq)} />}
                            />
                        ) : null}
                        {!(visualising || completed) ? (
                            <FormControlLabel
                                checked={draw}
                                label="Draw path on move"
                                control={
                                    <Switch onChange={() => setDraw(!draw)} />
                                }
                            />
                        ) : null}
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} id="right">
                    <Typography variant="h2">Knight&apos;s Tour</Typography>
                    {!tutorial ? (
                        <span>
                            <Status tour={tour} completed={completed} />
                            <Moves tour={tour} />
                            <IsClosable tour={tour} />
                            <ProposedSolution tour={tour} />
                        </span>
                    ) : (
                        <div>
                            <Tutorial tutorial={tutorial} />
                            <ButtonGroup
                                style={{ margin: "1em 0 0 0 " }}
                                variant="contained"
                                color="primary"
                            >
                                {tutorial > 1 ? (
                                    <Button
                                        onClick={() =>
                                            setTutorial(tutorial - 1)
                                        }
                                    >
                                        Previous
                                    </Button>
                                ) : null}
                                {tutorial < 6 ? (
                                    <Button
                                        onClick={() =>
                                            setTutorial(tutorial + 1)
                                        }
                                    >
                                        Next
                                    </Button>
                                ) : null}
                                <Button onClick={() => setTutorial(0)}>
                                    Quit
                                </Button>
                            </ButtonGroup>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export const boardTheme = {
    customBoardStyle: {
        borderRadius: "4px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        color: "black",
    },
    customLightSquareStyle: { background: "#FFF4E0" },
    customDarkSquareStyle: { background: "#4D4D4D" },
};

export default App;
