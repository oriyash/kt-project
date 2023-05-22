import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import KnightIcon from "./KnightIcon";

function Tutorial({ tutorial }) {
    if (!tutorial) {
        return null;
    } else if (tutorial === 1) {
        const rules = [
            "The aim of the game is to visit all the squares on the board with the white knight",
            "You cannot move to squares you have already visited",
            "Previously visited squares will be occupied with a black knight",
            "The knight moves like in a normal game of chess",
        ];

        return (
            <div>
                <Typography variant="h3">Knight&apos;s Tour Basics</Typography>
                <Steps list={rules} />
            </div>
        );
    } else if (tutorial === 2) {
        const actions = [
            "Choose your starting square by clicking on it or randomise",
            "Move to square by dragging the white knight to it or clicking on it",
            "You can show the path you took",
            "The moves you play will show up next or below the board",
            "You can undo your previous move or reset the game",
        ];
        return (
            <div>
                <Typography variant="h3">Possible Actions</Typography>{" "}
                <Steps list={actions} />
            </div>
        );
    } else if (tutorial === 3) {
        const moves = [
            "Hovering or clicking the white knight will show the different valid squares",
            "The recommended move is shown in green",
            "A losing move shows up in red",
        ];
        return (
            <div>
                <Typography variant="h3">Valid moves</Typography>
                <Steps list={moves} />
            </div>
        );
    } else if (tutorial === 4) {
        const info = [
            "At any point in the game you can try and use the computer to complete the tour",
            "The autocomplete uses Warnsdorff Heuristic to complete the tour",
            "The proposed solution will show up under your moves",
            "You may explore the solution move by move manually or use the auto visualisation",
        ];
        return (
            <div>
                <Typography variant="h3">Autocomplete</Typography>
                <Steps list={info} />
            </div>
        );
    } else if (tutorial === 5) {
        const info = [
            "Every completed knight's tour is either an open tour or a closed tour",
            "A closed tour means that with one extra move the knight could move back to the square it started on",
            "At the end of a tour a prompt will show up saying if the current tour is open or close",
        ];
        return (
            <div>
                <Typography variant="h3">Open and Closed tours</Typography>
                <Steps list={info} />
            </div>
        );
    } else if (tutorial === 6) {
        const settings = [
            "Show least degree move - shows the move recommended by Warnsdorff Heuristic",
            "Show path when visualising - traces the path with arrows on the auto visualisation",
            "Use King/Queen - replaces the starting and ending knights with King and Queen",
            "Draw path on move - will show the current path when moving the knight",
        ];
        return (
            <div>
                <Typography variant="h3">Different Settings</Typography>
                <Steps list={settings} />
            </div>
        );
    }
}

function Steps({ list }) {
    return list.map((item, index) => {
        return (
            <div
                key={index}
                style={{
                    background: "#1d4e89",
                    padding: "1em",
                    margin: "1em 0 0 0",
                    borderRadius: "1em",
                }}
            >
                <Typography variant="h5">
                    <KnightIcon /> {item}
                </Typography>
            </div>
        );
    });
}

Tutorial.propTypes = {
    tutorial: PropTypes.number,
};

export default Tutorial;
