export function numSq(pos) {
    if (pos === "a8") {
        return 0;
    } else if (pos === "b8") {
        return 1;
    } else if (pos === "c8") {
        return 2;
    } else if (pos === "d8") {
        return 3;
    } else if (pos === "e8") {
        return 4;
    } else if (pos === "f8") {
        return 5;
    } else if (pos === "g8") {
        return 6;
    } else if (pos === "h8") {
        return 7;
    } else if (pos === "a7") {
        return 8;
    } else if (pos === "b7") {
        return 9;
    } else if (pos === "c7") {
        return 10;
    } else if (pos === "d7") {
        return 11;
    } else if (pos === "e7") {
        return 12;
    } else if (pos === "f7") {
        return 13;
    } else if (pos === "g7") {
        return 14;
    } else if (pos === "h7") {
        return 15;
    } else if (pos === "a6") {
        return 16;
    } else if (pos === "b6") {
        return 17;
    } else if (pos === "c6") {
        return 18;
    } else if (pos === "d6") {
        return 19;
    } else if (pos === "e6") {
        return 20;
    } else if (pos === "f6") {
        return 21;
    } else if (pos === "g6") {
        return 22;
    } else if (pos === "h6") {
        return 23;
    } else if (pos === "a5") {
        return 24;
    } else if (pos === "b5") {
        return 25;
    } else if (pos === "c5") {
        return 26;
    } else if (pos === "d5") {
        return 27;
    } else if (pos === "e5") {
        return 28;
    } else if (pos === "f5") {
        return 29;
    } else if (pos === "g5") {
        return 30;
    } else if (pos === "h5") {
        return 31;
    } else if (pos === "a4") {
        return 32;
    } else if (pos === "b4") {
        return 33;
    } else if (pos === "c4") {
        return 34;
    } else if (pos === "d4") {
        return 35;
    } else if (pos === "e4") {
        return 36;
    } else if (pos === "f4") {
        return 37;
    } else if (pos === "g4") {
        return 38;
    } else if (pos === "h4") {
        return 39;
    } else if (pos === "a3") {
        return 40;
    } else if (pos === "b3") {
        return 41;
    } else if (pos === "c3") {
        return 42;
    } else if (pos === "d3") {
        return 43;
    } else if (pos === "e3") {
        return 44;
    } else if (pos === "f3") {
        return 45;
    } else if (pos === "g3") {
        return 46;
    } else if (pos === "h3") {
        return 47;
    } else if (pos === "a2") {
        return 48;
    } else if (pos === "b2") {
        return 49;
    } else if (pos === "c2") {
        return 50;
    } else if (pos === "d2") {
        return 51;
    } else if (pos === "e2") {
        return 52;
    } else if (pos === "f2") {
        return 53;
    } else if (pos === "g2") {
        return 54;
    } else if (pos === "h2") {
        return 55;
    } else if (pos === "a1") {
        return 56;
    } else if (pos === "b1") {
        return 57;
    } else if (pos === "c1") {
        return 58;
    } else if (pos === "d1") {
        return 59;
    } else if (pos === "e1") {
        return 60;
    } else if (pos === "f1") {
        return 61;
    } else if (pos === "g1") {
        return 62;
    } else if (pos === "h1") {
        return 63;
    } else {
        return null;
    }
}

export function createRandomFen() {
    const rank = Math.floor(Math.random() * 8);
    const file = Math.floor(Math.random() * 8);

    const preKnight = "8/".repeat(rank);
    const knight = file ? (file === 7 ? "7N/" : `${file}N${7 - file}/`) : "N7/";
    const postKnight = "8/".repeat(7 - rank);

    const fen = `${preKnight}${knight}${postKnight}`.slice(0, -1);
    return {
        fenSt: fen,
        rankNum: rank,
        fileNum: file,
    };
}
