import { completeTour, getSq, initValids } from "./tour";

describe("Autocomplete tour from any starting square", () => {
    for (let i = 0; i < 64; i++) {
        let tour = {
            visited: [i],
            visitedStr: [getSq(i)],
            validMoves: initValids(getSq(i), i),
        };
        it(`Check the length of produced tour from ${i}`, () => {
            expect(completeTour(tour).visited.length).toBe(64);
        });
    }
});
