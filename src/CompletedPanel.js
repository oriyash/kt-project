import { makeMoveStr } from "./tour";

function CompletedPanel({ tour, impossible }) {
    if (
        impossible ||
        (tour.visited.length !== 64 && tour.validMoves.length === 0)
    ) {
        return <h2>Could not find a tour from this position try again.</h2>;
    } else if (tour.completed === null) {
        return <h2>Tour is not completed</h2>;
    } else if (tour.completed.visited.length === 64) {
        return <p>{makeMoveStr(tour.completed.visitedStr)}</p>;
    }
}

CompletedPanel.propTypes = {
    tour: Object,
    impossible: Boolean,
};

export default CompletedPanel;
