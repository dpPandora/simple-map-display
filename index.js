const readline = require("readline-sync");

//== Map assets ================

var empty = '\u2591\u2591';
var topLeft = `\u250C`;
var horizontal = `\u2500\u2500`;
var topRight = `\u2510`;
var vertical = `\u2502`;
var bottomLeft = `\u2514`;
var bottomRight = `\u2518`;

var wall = `\u2593\u2593`

var playerCharacter = '\u2697 ';
//yeah i knoow this couldve been an array but like, i dont care
//==============================

let idOne = 65;
let idTwo = 65;

//const map = [];
//var mapWidth = 16,
//    mapHeight = 16;
//map info

class Level {
    map = [];
    mapWidth;//for it to look square it should probably be set 4 higher than the height
    mapHeight;

    constructor(height = 16, width = 20, theY = 0, theX = 0) {
        this.mapHeight = height;
        this.mapWidth = width;

        this.playerY = theY;
        this. playerX = theX;
    };

    generateMap() {
        console.log("Generating map...");
        for (var placeY = 0; placeY < this.mapHeight; placeY++) {
            var tempArr = [];
            for (var placeX = 0; placeX < this.mapWidth; placeX++) {
                tempArr.push(empty);
            }
            this.map.push(tempArr);
        }
        
        if (this.map.length === 0 || this.map[0].length === 0) console.log("Map generation failed... :<");
        else console.log("Map generated...");
    };
//== player data and movement ==
    playerY;
    playerX;
    moveUp() {
        console.clear();
        if (this.playerY != 0 && this.map[this.playerY - 1][this.playerX] != wall) this.playerY--;
        else console.log("I can't move any higher");
        console.log(`Moved to (${this.playerY}, ${this.playerX})`);
        this.printMap();
    };
    moveDown() {
        console.clear();
        if (this.playerY < this.mapHeight - 1 && this.map[this.playerY + 1][this.playerX] != wall) this.playerY++;
        else console.log("I can't move any lower");
        console.log(`Moved to (${this.playerY}, ${this.playerX})`);
        this.printMap();
    };
    moveLeft() {
        console.clear();
        if (this.playerX != 0 && this.map[this.playerY][this.playerX - 1] != wall) this.playerX--;
        else console.log("I can't go left");
        console.log(`Moved to (${this.playerY}, ${this.playerX})`);
        this.printMap();
    };
    moveRight() {
        console.clear();
        if (this.playerX < this.mapWidth - 1 && this.map[this.playerY][this.playerX + 1] != wall) this.playerX++;
        else console.log("I can't go right");
        console.log(`Moved to (${this.playerY}, ${this.playerX})`);
        this.printMap();
    };
//== map printing and maybe modification ==
    printMap() {
        //console.debug("Printing function started...");
        var fullWidth = this.mapWidth + 2;
        var fullHeight = this.mapHeight + 2;
        var formatedMap = []; 

        var end = fullWidth - 1;

        //adding borders to formatedMap, i hope this works because i have to finish the code to insert the map into the formatedMap so i cant print it yet... yikes

        //console.log("Creating map borders...");

        for (var placeY = 0; placeY < fullHeight; placeY++) {
            formatedMap.push([]);
            if (placeY === 0) {
                formatedMap[placeY][0] = topLeft;
                for (var top = 1; top < fullWidth - 1; top++) formatedMap[placeY][top] = horizontal;
                formatedMap[placeY][end] = topRight;
            }
            else if (placeY === fullHeight - 1) {
                formatedMap[placeY][0] = bottomLeft;
                for (var bottom = 1; bottom < fullWidth - 1; bottom++) formatedMap[placeY][bottom] = horizontal;
                formatedMap[placeY][end] = bottomRight
            }
            else {
                formatedMap[placeY][0] = vertical;

                for (var placeX = 1; placeX < end; placeX++) formatedMap[placeY][placeX] = this.map[placeY - 1][placeX - 1];

                formatedMap[placeY][end] = vertical;
            }
        }

        //if (formatedMap.length === 0 || formatedMap[0].length === 0) console.debug("Map border creation failed...");
        //else console.debug("Map borders created...");

        //console.debug("Printing finished map!");

        //console.debug(formatedMap);

        formatedMap[this.playerY + 1][this.playerX + 1] = playerCharacter;

        for (var placeY = 0; placeY < fullHeight; placeY++) {
            for (var placeX = 0; placeX < fullWidth; placeX++) {
                process.stdout.write(formatedMap[placeY][placeX]);
            }
            //process.stdout.write(`｜ line:${placeY}\n`);
            process.stdout.write(`\n`);
        }
    }   
}

function generateMaze(map) {
    let width = map.mapWidth;
    let height = map.mapHeight;

    console.log(`Started maze generation with y: ${height} and x: ${width}...`);

    for (let y = 0; y < height; y++) {
        //console.log("y: " + y);
        if (y % 2 === 0) {
            for (let x = 1; x < width; x += 2) {
                //console.log("x: " + x);
                map.map[y][x] = wall;
            }
        }
        else {
            for (let x = 0; x < width; x++) {
                map.map[y][x] = wall;
            }
        }
    }

    console.log("Step 1 finished...\nHere comes the hard part...")

    let vol = width * height;
    let sets = new Object();
    let weights = [];
    let choseId;
    let weightR = 0;
    let weightD = 0;
    let usedWeights = [];

    for (let y = 0; y < height; y += 2) {
        //console.log(usedWeights);
        for (let x = 0; x < width; x += 2) {
            choseId = returnId();
            map.map[y][x] = choseId;
            sets[choseId] = [];
            sets[choseId].push([y,x]); 

            weightR = Math.floor(Math.random() * 100000000);
            weightD = Math.floor(Math.random() * 100000000);

            while (usedWeights.includes(weightR)) {
                weightR = Math.floor(Math.random() * 80);
                //console.log(usedWeights.includes(weightR))
                //console.log(usedWeights);
                //console.log(weightR + "R");
            }
//
            while (usedWeights.includes(weightD)) {
                weightD = Math.floor(Math.random() * 80);
                //console.log(weightD + "D");
            }

            if (map.map[y][x + 2] != undefined) {
                weights.push([y, x, y, x + 2, weightR, choseId]);
                usedWeights.push(weightR);
            }

            try {
                if (map.map[y + 2][x] != undefined) {
                    weights.push([y, x, y + 2, x, weightD, choseId]);
                    usedWeights.push(weightD);
                }
            }
            catch {}
        }
    }
    weights.sort((a ,b) => a[4] - b[4]);
    //console.log(weights);
    let pointOne;
    let pointTwo;
    let diffY;
    let diffx;

    for (let path = 0; path < weights.length; path++) {
        pointOne = map.map[weights[path][0]][weights[path][1]];
        pointTwo = map.map[weights[path][2]][weights[path][3]];
        //console.log(pointOne + pointTwo);
        diffx = weights[path][3] - weights[path][1];
        diffY = weights[path][2] - weights[path][0];
        if (pointOne != pointTwo) {
            //console.log(diffY + " " + diffx)
            //console.log(map.map[weights[path][0]][weights[path][1]] + map.map[weights[path][2]][weights[path][3]]);
            for (let i = 0; i < sets[pointTwo].length; i++) {
                sets[pointOne].push(sets[pointTwo][i]);
                map.map[sets[pointTwo][i][0]][sets[pointTwo][i][1]] = pointOne;
            }

            //console.log(sets);

            //console.log(pointOne+ pointTwo + "\n" + sets[pointOne]);

            let newY = weights[path][0] + diffY / 2;
            let newX = weights[path][1] + diffx / 2;
            
            map.map[newY][newX] = empty;
        }
    }
    for (let f = 0; f < sets[pointOne].length; f++) {
        map.map[sets[pointOne][f][0]][sets[pointOne][f][1]] = empty;   
    }
}

function returnId() {
    let first = idOne;
    let second = idTwo;
    let id = String.fromCharCode(idOne, idTwo);

    if (second  >= 90) {
        idOne++;
        idTwo = 65;
    }
    else {
        idTwo++;
    }

    return id;
}

function startGame(map) {
    var choice = "";
    map.printMap();

    while (choice != "quit") {
        choice = readline.question("What would you like to do?\n>");
        switch (choice) {
            case "up":
                map.moveUp();
                break;
            case "down":
                map.moveDown();
                break;
            case "left":
                map.moveLeft();
                break;
            case "right":
                map.moveRight();
                break;
            case "quit":
                break;
            default: 
                choice = "quit";
                break;
        }
    }
}

//console.log(wall);

var mapOne = new Level(17, 21);
mapOne.generateMap();
generateMaze(mapOne);

mapOne.printMap();

startGame(mapOne);

//== map object, ill turn this into a class later so i can have multiple maps ==

//var level = {
//map: [],
//    mapWidth: 20,//for it to look square it should probably be set 4 higher than the height
//    mapHeight: 16,
//    generateMap() {
//        console.log("Generating map...");
//        for (var placeY = 0; placeY < this.mapHeight; placeY++) {
//            var tempArr = [];
//            for (var placeX = 0; placeX < this.mapWidth; placeX++) {
//                tempArr.push(empty);
//            }
//            this.map.push(tempArr);
//        }
//        
//        if (this.map.length === 0 || this.map[0].length === 0) console.log("Map generation failed... :<");
//        else console.log("Map generated...");
//    },
////== player data and movement ==
//    playerY: 0,
//    playerX: 0,
//    moveUp() {
//        console.clear();
//        if (this.playerY != 0) this.playerY--;
//        else console.log("I can't move any higher");
//        this.printMap();
//    },
//    moveDown() {
//        console.clear();
//        if (this.playerY < this.mapHeight - 1) this.playerY++;
//        else console.log("I can't move any lower");
//        this.printMap();
//    },
//    moveLeft() {
//        console.clear();
//        if (this.playerX != 0) this.playerX--;
//        else console.log("I can't go left");
//        this.printMap();
//    },
//    moveRight() {
//        console.clear();
//        if (this.playerX < this.mapWidth - 1) this.playerX++;
//        else console.log("I can't go right");
//        this.printMap();
//    },
////== map printing and maybe modification ==
//    printMap() {
//        //console.debug("Printing function started...");
//        var fullWidth = this.mapWidth + 2;
//        var fullHeight = this.mapHeight + 2;
//        var formatedMap = []; 
//
//        var end = fullWidth - 1;
//
//        //adding borders to formatedMap, i hope this works because i have to finish the code to insert the map into the formatedMap so i cant print it yet... yikes
//
//        //console.log("Creating map borders...");
//
//        for (var placeY = 0; placeY < fullHeight; placeY++) {
//            formatedMap.push([]);
//            if (placeY === 0) {
//                formatedMap[placeY][0] = topLeft;
//                for (var top = 1; top < fullWidth - 1; top++) formatedMap[placeY][top] = horizontal;
//                formatedMap[placeY][end] = topRight;
//            }
//            else if (placeY === fullHeight - 1) {
//                formatedMap[placeY][0] = bottomLeft;
//                for (var bottom = 1; bottom < fullWidth - 1; bottom++) formatedMap[placeY][bottom] = horizontal;
//                formatedMap[placeY][end] = bottomRight
//            }
//            else {
//                formatedMap[placeY][0] = vertical;
//
//                for (var placeX = 1; placeX < end; placeX++) formatedMap[placeY][placeX] = this.map[placeY - 1][placeX - 1];
//
//                formatedMap[placeY][end] = vertical;
//            }
//        }
//
//        //if (formatedMap.length === 0 || formatedMap[0].length === 0) console.debug("Map border creation failed...");
//        //else console.debug("Map borders created...");
//
//        //console.debug("Printing finished map!");
//
//        //console.debug(formatedMap);
//
//        formatedMap[this.playerY + 1][this.playerX + 1] = playerCharacter;
//
//        for (var placeY = 0; placeY < fullHeight; placeY++) {
//            for (var placeX = 0; placeX < fullWidth; placeX++) {
//                process.stdout.write(formatedMap[placeY][placeX]);
//            }
//            //process.stdout.write(`｜ line:${placeY}\n`);
//            process.stdout.write(`\n`);
//        }
//    }
//}
//
//level.generateMap();
//level.printMap();

//var choice = "";

//while (choice != "quit") {
//    choice = readline.question("What would you like to do?\n>");
//    switch (choice) {
//        case "up":
//            level.moveUp();
//            break;
//        case "down":
//            level.moveDown();
//            break;
//        case "left":
//            level.moveLeft();
//            break;
//        case "right":
//            level.moveRight();
//            break;
//        case "quit":
//            break;
//        default: 
//            choice = "quit";
//            break;
//    }
//}
//thank fuck everything works!!!

//for (var placeY = 0; placeY < mapHeight; placeY++) {
//    for (var placeX = 0; placeX < mapWidth; placeX++) {
//        process.stdout.write(map[placeY][placeX]);
//    }
//    process.stdout.write(`｜ line:${placeY}\n`);
//}

//console.log(`￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\nmap width:${map[0].length}\nmap height:${map.length}`);

//console.log(`\u250C\u2500\u2500\u2510`);
//console.log(`\u2502` + empty + `\u2502`);
//console.log(`\u2514\u2500\u2500\u2518`);