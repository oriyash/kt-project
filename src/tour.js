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

export function updateValids(srcSt, src) {
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
