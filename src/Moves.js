import { Typography } from "@mui/material";
import { makeMoveStr } from "./tour";

function Moves({ tour }) {
    return <Typography>{makeMoveStr(tour.visitedStr)}</Typography>;
}

export default Moves;
