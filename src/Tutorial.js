import "./Tutorial.css";
import NavButton from "./NavButton";
import { Chessboard } from "react-chessboard";
import { Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { boardTheme } from "./App";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Tutorial() {
    const [step, setStep] = useState(0);
    const [assets, setAssets] = useState({
        position: {
            b5: "bN",
            d6: "bN",
            e4: "wN",
        },
        arrows: [
            ["b5", "d6"],
            ["d6", "e4"],
        ],
        isDraggable: () => false,
    });

    useEffect(() => {
        if (step === 0) {
            setAssets({
                position: {
                    b5: "bN",
                    d6: "bN",
                    e4: "wN",
                },
                arrows: [
                    ["b5", "d6"],
                    ["d6", "e4"],
                ],
                isDraggable: () => false,
            });
        } else if (step === 1) {
            setAssets({
                position: {
                    b5: "bN",
                    d6: "bN",
                    e4: "wN",
                },
                arrows: [
                    ["b5", "d6"],
                    ["d6", "e4"],
                ],
                isDraggable: () => true,
            });
        } else if (step === 2) {
            setAssets({
                position: {
                    b5: "bN",
                    d6: "bN",
                    e4: "wN",
                },
                arrows: [
                    ["b5", "d6"],
                    ["d6", "e4"],
                    ["e4", "g6"],
                ],
                isDraggable: () => false,
            });
        }
    }, [step]);

    return (
        <Grid container>
            <Grid item xs={12} md={6} lg={6}>
                <Chessboard
                    position={assets.position}
                    isDraggablePiece={assets.isDraggable}
                    customArrows={assets.arrows}
                    customBoardStyle={boardTheme.customBoardStyle}
                    customDarkSquareStyle={boardTheme.customDarkSquareStyle}
                    customLightSquareStyle={boardTheme.customLightSquareStyle}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Typography variant="h4">Tutorial</Typography>
                <NavButton to={"/"}>Home</NavButton>
                {step > 0 ? (
                    <Fab onClick={() => setStep(step - 1)}>
                        <ArrowBackIcon />
                    </Fab>
                ) : null}
                {step < 2 ? (
                    <Fab onClick={() => setStep(step + 1)}>
                        <ArrowForwardIcon />
                    </Fab>
                ) : null}
            </Grid>
        </Grid>
    );
}

export default Tutorial;
