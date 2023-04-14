import { Typography } from "@mui/material";
import { initValids } from "./tour";
import PropTypes from "prop-types";

function IsClosable({ tour }) {
    if (tour.visited.length === 64) {
        const firstMove = tour.visited[0];
        const lastValids = initValids(
            tour.visitedStr.slice(-1)[0],
            tour.visited.slice(-1)[0]
        );
        if (lastValids.includes(firstMove)) {
            return (
                <Typography variant="h4">This tour can be closed</Typography>
            );
        } else {
            return <Typography variant="h4">This is an open tour</Typography>;
        }
    } else {
        return null;
    }
}

IsClosable.propTypes = {
    tour: PropTypes.object,
};

export default IsClosable;
