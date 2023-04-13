import { Avatar, Chip } from "@mui/material";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";

function Moves({ tour }) {
    if (tour.visited.length > 0) {
        let moves = cloneDeep(tour.visitedStr);
        return (
            <div>
                {moves.map((item, index) => (
                    <Chip
                        key={index}
                        avatar={<Avatar>{index + 1}</Avatar>}
                        label={item}
                        color="secondary"
                        className="chip"
                    />
                ))}
            </div>
        );
    } else {
        return null;
    }
}

Moves.propTypes = { tour: PropTypes.object };

export default Moves;
