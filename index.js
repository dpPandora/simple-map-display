const readline = require("readline-sync");

//== Map assets ================

var empty = '\u2591\u2591';
var topLeft = `\u250C`;
var horizontal = `\u2500\u2500`;
var topRight = `\u2510`;
var vertical = `\u2502`;
var bottomLeft = `\u2514`;
var bottomRight = `\u2518`
//yeah i knoow this couldve been an array but like, i dont care
//==============================

//const map = [];
//var mapWidth = 16,
//    mapHeight = 16;
//map info


//== map object, ill turn this into a class later so i can have multiple maps ==

var level = {
    map: [],
    mapWidth: 20,//for it to look square it should probably be set 4 higher than the height
    mapHeight: 16,
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
    },
//== player data and movement ==
    playerY: 0,
    playerX: 0,
    moveUp() {
        if (this.playerY != 0) this.playerY--;
        else console.log("I can't move any higher");
    },
    moveDown() {
        if (this.playerY < this.mapHeight) this.playerY++;
        else console.log("I can't move any lower");
    },
    moveLeft() {
        if (this.playerX != 0) this.playerX--;
        else console.log("I can't go left");
    },
    moveRight() {
        if (this.playerX < this.mapWidth) this.playerX++;
        else console.log("I can't go left");
    },
//== map printing and maybe modification ==
    printMap() {
        console.log("Printing function started...");
        var fullWidth = this.mapWidth + 2;
        var fullHeight = this.mapHeight + 2;
        var formatedMap = []; 

        var end = fullWidth - 1;

        //adding borders to formatedMap, i hope this works because i have to finish the code to insert the map into the formatedMap so i cant print it yet... yikes

        console.log("Creating map borders...");

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

        if (formatedMap.length === 0 || formatedMap[0].length === 0) console.log("Map border creation failed...");
        else console.log("Map borders created...");

        console.log("Printing finished map!");

        for (var placeY = 0; placeY < fullHeight; placeY++) {
            for (var placeX = 0; placeX < fullWidth; placeX++) {
                process.stdout.write(formatedMap[placeY][placeX]);
            }
            //process.stdout.write(`｜ line:${placeY}\n`);
            process.stdout.write(`\n`);
        }
    }
}

level.generateMap();
level.printMap();

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