export class Tour {
    constructor() {
        const init = this.makeFen();
        const initSq = 8 * init.rank + init.file;

        this.fen = init.fen;
        this.visited = [initSq];
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
    }

    // return { rank: rank, file: file };

    return 8 * rank + file;
}
