import { Typography } from "@mui/material";
import PropTypes from "prop-types";

function Status({ tour, completed }) {
    if (tour.visited.length === 0) {
        return (
            <Typography variant="h3">Click on any square to start♟️</Typography>
        );
    } else if (tour.visited.length === 64) {
        return <Typography variant="h3">Tour complete✅</Typography>;
    } else if (tour.visited.length !== 0 && completed !== null) {
        return <Typography variant="h3">Tour incomplete</Typography>;
    } else if (tour.visited.length !== 0 && completed === null) {
        return (
            <Typography variant="h3">Tour impossible, try again 🥲</Typography>
        );
    }
}

Status.propTypes = { tour: PropTypes.object, completed: PropTypes.bool };

export default Status;
