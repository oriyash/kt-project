export class Tour {
    // create tour classs
    constructor() {
        this.fen = this.createRandomFen();
    }

    createRandomFen() {
        const rank = Math.floor(Math.random() * 8);
        const file = Math.floor(Math.random() * 8);

        const preKnight = "8/".repeat(rank);
        const knight = file
            ? file === 7
                ? "7N/"
                : `${file}N${7 - file}/`
            : "N7/";
        const postKnight = "8/".repeat(7 - rank);

        const fen = `${preKnight}${knight}${postKnight}`.slice(0, -1);
        return fen;
    }
}
