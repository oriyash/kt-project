import { Typography } from "@mui/material";
import PropTypes from "prop-types";

function Status({ tour, completed }) {
    if (tour.visited.length === 0) {
        return <Typography variant="h2">Click anywhere to start!</Typography>;
    } else if (completed === false) {
        return <Typography variant="h3">Tour not completed</Typography>;
    } else if (completed === null) {
        return <Typography variant="h2">Tour impossible</Typography>;
    } else if (completed && tour.completed !== null) {
        return (
            <Typography variant="h2">
                Completed with Warnsdorff Heuristic
            </Typography>
        );
    } else if (completed && tour.completed === null) {
        return (
            <Typography variant="h2">
                Congratulations you completed the tour
            </Typography>
        );
    }
}

Status.propTypes = { tour: PropTypes.object, completed: PropTypes.bool };

export default Status;
