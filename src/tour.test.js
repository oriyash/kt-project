import { updateValids } from "./tour";

test(
    "update valids from c1 to d3 with starting tour on c1",
    expect(() => updateValids("d3", 43, [58])).toStrictEqual([
        26, 28, 33, 37, 49, 53, 60,
    ])
);
