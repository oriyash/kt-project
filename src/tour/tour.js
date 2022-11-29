import { numSq, createRandomFen } from "./functions.js";

export class Tour {
    // create tour classs
    constructor() {
        const init = createRandomFen();

        this.fen = init.fenSt;
        this.current = 8 * init.rankNum + init.fileNum;
        this.visited = [8 * init.rankNum + init.fileNum];
    }

    onDrop(sourceSquare, targetSquare) {
        let src = numSq(sourceSquare);
        let tgt = numSq(targetSquare);

        console.log(src);
        console.log(tgt);
    }

    // TODO: Function to track valid moves
    // TODO: Function to update visted
}
