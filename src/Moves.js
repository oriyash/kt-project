import { Typography } from "@mui/material";
import { makeMoveStr } from "./tour";
import PropTypes from "prop-types";

function Moves({ tour }) {
    return <Typography>{makeMoveStr(tour.visitedStr)}</Typography>;
}

Moves.propTypes = { tour: PropTypes.object };

export default Moves;
