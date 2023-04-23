import PropTypes from "prop-types";
import "./ProposedSolution.css";
import { cloneDeep } from "lodash";
import { Chip, Typography, Avatar } from "@mui/material";

function ProposedSolution({ tour }) {
    if (tour.completed === undefined) {
        return null;
    } else if (tour.completed === null) {
        return (
            <Typography variant="h4">
                No solution found with Warnsdorff Heuristic
            </Typography>
        );
    } else {
        let moves = cloneDeep(tour.completed.visitedStr);
        moves = moves.slice(tour.visitedStr.length);
        return (
            <div>
                <Typography variant="h4">
                    Solution found with Warnsdorff Heuristic
                </Typography>
                {moves.map((item, index) => (
                    <Chip
                        key={index}
                        avatar={
                            <Avatar>{index + tour.visited.length + 1}</Avatar>
                        }
                        label={item}
                        color="secondary"
                        className="chip"
                    />
                ))}
            </div>
        );
    }
}

ProposedSolution.propTypes = { tour: PropTypes.object };

export default ProposedSolution;
