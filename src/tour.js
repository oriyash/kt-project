export class Tour {
    constructor() {
        const init = this.makeFen();
        const initSq = 8 * init.rank + init.file;
        const initSqStr = makeStrCoord(init.rank, init.file);

        console.log(initSqStr);

        // console.log(`${init.rank} and ${init.file}`);

        this.fen = init.fen;
        this.visited = [initSq];
        // this.validMoves = Array(64);
        this.validMoves = this.updateValids(initSqStr, initSq);

        console.log(this.validMoves);
        console.log(this.visited);
    }

    makeFen() {
        const rank = Math.floor(Math.random() * 8);
        const file = Math.floor(Math.random() * 8);

        const preKnight = "8/".repeat(rank);
        const knight = file
            ? file === 7
                ? "7N/"
                : `${file}N${7 - file}/`
            : "N7/";
        const postKnight = "8/".repeat(7 - rank);

        return {
            fen: `${preKnight}${knight}${postKnight}`.slice(0, -1),
            rank: rank,
            file: file,
        };
    }

    move(tgtSt) {
        const str = tgtSt;
        const tgt = makeNumber(str);

        if (!this.visited.includes(tgt) && this.validMoves.includes(tgt)) {
            this.visited.push(tgt);
            // TODO: updateFen() function
            // this.updateFen()
            this.validMoves = this.updateValids(str, tgt);
            return true;
        } else {
            return false;
        }
    }

    updateValids(srcSt, src) {
        const coords = makeCoord(srcSt);

        const rank = coords.rank;
        const file = coords.file;

        const vectors = [-17, -15, -10, -6, 6, 10, 15, 17];
        const cases = [0, 1, 6, 7];

        if (!cases.includes(rank) && !cases.includes(file)) {
            const res = vectors.map((val) => val + src);
            return res;
        } else {
            return "f";
        }
    }
}

function makeNumber(coord) {
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
    }

    return { rank: rank, file: file };
}

function makeStrCoord(rank, file) {
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
    }

    return `${ltrFile}${reRank}`;
}
