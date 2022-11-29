// import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Tour } from "./tour/tour";

export default function TourBoard() {
    // const [tour, tourSet] = useState(new Tour());

    const tour = new Tour();

    // create TourBoard Component
    return <Chessboard position={tour.fen} />;
}
