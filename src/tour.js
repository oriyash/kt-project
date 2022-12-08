export default class Tour {
    constructor() {
        this.fen = makeFen();
    }

    makeFen() {
        const rank = Math.floor(Math.random * 8);
        const file = Math.floor(Math.random * 8);
    }
}
