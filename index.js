const readline = require("readline-sync");

var empty = "　";

//const map = [];
//var mapWidth = 16,
//    mapHeight = 16;
//map info

var level = {
    map: [],
    mapWidth: 16,
    mapHeight: 16,
    generateMap() {
        for (var placeY = 0; placeY < this.mapHeight; placeY++) {
            var tempArr = [];
            for (var placeX = 0; placeX < this.mapWidth; placeX++) {
                tempArr.push(empty);
            }
            this.map.push(tempArr);
        }
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
        
    }
}


//for (var placeY = 0; placeY < mapHeight; placeY++) {
//    for (var placeX = 0; placeX < mapWidth; placeX++) {
//        process.stdout.write(map[placeY][placeX]);
//    }
//    process.stdout.write(`｜ line:${placeY}\n`);
//}

//console.log(`￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\nmap width:${map[0].length}\nmap height:${map.length}`);

