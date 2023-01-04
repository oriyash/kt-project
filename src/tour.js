import { cloneDeep, min } from "lodash";

export function makeFen() {
    const rank = Math.floor(Math.random() * 8);
    const file = Math.floor(Math.random() * 8);

    const preKnight = "8/".repeat(rank);
    const knight = file ? (file === 7 ? "7N/" : `${file}N${7 - file}/`) : "N7/";
    const postKnight = "8/".repeat(7 - rank);

    return {
        fen: `${preKnight}${knight}${postKnight}`.slice(0, -1),
        rank: rank,
        file: file,
    };
}

export function updateValids(tour, srcSt, src) {
    const valids = initValids(srcSt, src);
    return valids.filter((val) => !tour.visited.includes(val));
}

export function initValids(srcSt, src) {
    const coords = makeCoord(srcSt);

    const rank = coords.rank;
    const file = coords.file;

    let vectors = [-17, -15, -10, -6, 6, 10, 15, 17];
    const cases = [0, 1, 6, 7];

    if (!cases.includes(rank) && !cases.includes(file)) {
        vectors = vectors.map((val) => val + src);
        return vectors;
        // return vectors.filter((val) => !visited.includes(val));
    }

    if (cases.includes(rank)) {
        if (rank === 0) {
            vectors = vectors.filter((vec) => vec > 0);
        } else if (rank === 7) {
            vectors = vectors.filter((vec) => vec < 0);
        } else if (rank === 1) {
            vectors = vectors.filter((vec) => !(vec === -17 || vec === -15));
        } else if (rank === 6) {
            vectors = vectors.filter((vec) => !(vec === 17 || vec === 15));
        }
    }

    if (cases.includes(file)) {
        if (file === 0) {
            vectors = vectors.filter(
                (vec) =>
                    !(vec === -17 || vec === -10 || vec === 6 || vec === 15)
            );
        } else if (file === 7) {
            vectors = vectors.filter(
                (vec) =>
                    !(vec === 17 || vec === 10 || vec === -6 || vec === -15)
            );
        } else if (file === 1) {
            vectors = vectors.filter((vec) => !(vec === -10 || vec === 6));
        } else if (file === 6) {
            vectors = vectors.filter((vec) => !(vec === 10 || vec === -6));
        }
    }

    vectors = vectors.map((val) => val + src);
    return vectors;
    // return vectors.filter((val) => !visited.includes(val));
}

export function updateFen(visited) {
    let fen = "";
    let line = "";
    let lastSeen = 0;

    for (let i = 0; i < 64; i++) {
        if (visited.includes(i)) {
            const n = visited.indexOf(i) === visited.length - 1 ? "N" : "n";

            const pre = !lastSeen ? "" : lastSeen;
            line = line.concat(`${pre}${n}`);
            lastSeen = -1;
        }
        lastSeen += 1;

        if ((i + 1) % 8 === 0) {
            if (line === "") {
                fen = fen.concat("8/");
            } else {
                const post = !lastSeen ? "" : lastSeen;
                fen = fen.concat(`${line}${post}/`);
            }
            line = "";
            lastSeen = 0;
        }
    }

    return fen.slice(0, -1);
}

export function makeNumber(coord) {
    // const rank = coord[-1];
    const rank = 7 - (Number(coord.slice(-1)) - 1);
    let file = coord[0];

    switch (file) {
        case "a": {
            file = 0;
            break;
        }
        case "b": {
            file = 1;
            break;
        }
        case "c": {
            file = 2;
            break;
        }
        case "d": {
            file = 3;
            break;
        }
        case "e": {
            file = 4;
            break;
        }
        case "f": {
            file = 5;
            break;
        }
        case "g": {
            file = 6;
            break;
        }
        case "h": {
            file = 7;
            break;
        }
        default:
            break;
    }

    return 8 * rank + file;
}

function makeCoord(coord) {
    const rank = 7 - (Number(coord.slice(-1)) - 1);
    let file = coord[0];

    switch (file) {
        case "a": {
            file = 0;
            break;
        }
        case "b": {
            file = 1;
            break;
        }
        case "c": {
            file = 2;
            break;
        }
        case "d": {
            file = 3;
            break;
        }
        case "e": {
            file = 4;
            break;
        }
        case "f": {
            file = 5;
            break;
        }
        case "g": {
            file = 6;
            break;
        }
        case "h": {
            file = 7;
            break;
        }
        default:
            break;
    }

    return { rank: rank, file: file };
}

export function makeStrCoord(rank, file) {
    let ltrFile;
    let reRank;

    switch (file) {
        case 0:
            ltrFile = "a";
            break;
        case 1:
            ltrFile = "b";
            break;
        case 2:
            ltrFile = "c";
            break;
        case 3:
            ltrFile = "d";
            break;
        case 4:
            ltrFile = "e";
            break;
        case 5:
            ltrFile = "f";
            break;
        case 6:
            ltrFile = "g";
            break;
        case 7:
            ltrFile = "h";
            break;
        default:
            break;
    }

    switch (rank) {
        case 0:
            reRank = 8;
            break;
        case 1:
            reRank = 7;
            break;
        case 2:
            reRank = 6;
            break;
        case 3:
            reRank = 5;
            break;
        case 4:
            reRank = 4;
            break;
        case 5:
            reRank = 3;
            break;
        case 6:
            reRank = 2;
            break;
        case 7:
            reRank = 1;
            break;
        default:
            break;
    }

    return `${ltrFile}${reRank}`;
}

export function completeTour(tour) {
    const newTour = cloneDeep(tour);

    while (newTour.validMoves.length !== 0) {
        let bestMove = findBestMove(newTour);

        newTour.visited = [...newTour.visited, bestMove];
        newTour.visitedStr = [...newTour.visitedStr, getSq(bestMove)];
        newTour.validMoves = updateValids(newTour, getSq(bestMove), bestMove);
    }

    // console.log(newTour.visitedStr);

    if (newTour.visited.length === 64) {
        return { visited: newTour.visited, visitedStr: newTour.visitedStr };
    } else {
        return null;
    }
}

export function findBestMove(tour) {
    const valids = tour.validMoves;

    const deg = valids.map(
        (move) => updateValids(tour, getSq(move), move).length
    );

    return valids[deg.indexOf(min(deg))];
}

export function getSq(num) {
    switch (num) {
        case 0:
            return "a8";
        case 1:
            return "b8";
        case 2:
            return "c8";
        case 3:
            return "d8";
        case 4:
            return "e8";
        case 5:
            return "f8";
        case 6:
            return "g8";
        case 7:
            return "h8";
        case 8:
            return "a7";
        case 9:
            return "b7";
        case 10:
            return "c7";
        case 11:
            return "d7";
        case 12:
            return "e7";
        case 13:
            return "f7";
        case 14:
            return "g7";
        case 15:
            return "h7";
        case 16:
            return "a6";
        case 17:
            return "b6";
        case 18:
            return "c6";
        case 19:
            return "d6";
        case 20:
            return "e6";
        case 21:
            return "f6";
        case 22:
            return "g6";
        case 23:
            return "h6";
        case 24:
            return "a5";
        case 25:
            return "b5";
        case 26:
            return "c5";
        case 27:
            return "d5";
        case 28:
            return "e5";
        case 29:
            return "f5";
        case 30:
            return "g5";
        case 31:
            return "h5";
        case 32:
            return "a4";
        case 33:
            return "b4";
        case 34:
            return "c4";
        case 35:
            return "d4";
        case 36:
            return "e4";
        case 37:
            return "f4";
        case 38:
            return "g4";
        case 39:
            return "h4";
        case 40:
            return "a3";
        case 41:
            return "b3";
        case 42:
            return "c3";
        case 43:
            return "d3";
        case 44:
            return "e3";
        case 45:
            return "f3";
        case 46:
            return "g3";
        case 47:
            return "h3";
        case 48:
            return "a2";
        case 49:
            return "b2";
        case 50:
            return "c2";
        case 51:
            return "d2";
        case 52:
            return "e2";
        case 53:
            return "f2";
        case 54:
            return "g2";
        case 55:
            return "h2";
        case 56:
            return "a1";
        case 57:
            return "b1";
        case 58:
            return "c1";
        case 59:
            return "d1";
        case 60:
            return "e1";
        case 61:
            return "f1";
        case 62:
            return "g1";
        case 63:
            return "h1";
        default:
            break;
    }
}

export function makeMoveStr(visitedStr) {
    let line = "";
    visitedStr.forEach(
        (val, index) => (line = line.concat(`${index + 1}.${val} `))
    );
    return line;
}

export function genArrows(visitedStr) {
    let arrows = [];
    for (let i = 1; i < visitedStr.length; i++) {
        let arrow = [visitedStr[i - 1], visitedStr[i]];
        arrows.push(arrow);
    }
    return arrows;
}

export function sqToFen(sqSt) {
    const coord = makeCoord(sqSt);
    const rank = coord.rank;
    const file = coord.file;

    const preKnight = "8/".repeat(rank);
    const knight = file ? (file === 7 ? "7N/" : `${file}N${7 - file}/`) : "N7/";
    const postKnight = "8/".repeat(7 - rank);

    return {
        fen: `${preKnight}${knight}${postKnight}`.slice(0, -1),
        rank: rank,
        file: file,
    };
}
