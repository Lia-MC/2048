var board;
var score = 0;
var rows = 4;
cols = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]

    board = [
        [4, 4, 2, 2],
        [4, 4, 0, 0],
        [0, 8, 8, 0],
        [16, 16, 16, 16]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("div") // creates a new div tag
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // clear classlist -> to avoid t4 also being t2, etc.
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;

        // after numbers are greater than 2048 tile style becomes stable
        if (num <= 2048) {
            tile.classList.add("t" + num.toString());
        } else {
            tile.classList.add("t4096");
        }
    }
}

// keyup = moment that the user let goes of the key
// e is the event
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    } 
    // else if (e.code == "ArrowRight") {
    //     slideRight();
    // }
    // else if (e.code == "ArrowUp") {
    //     slideUp();
    // }
    // else if (e.code == "ArrowDown") {
    //     slideDown();
    // }
}) 

function filterZeros(row) {
    // create a new array, where all but 0s are copied
    return row.filter(num => num != 0); 
}

function slide(row) {
    row = filterZeros(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZeros(row);

    while (row.length < cols) {
        row.push(0); // adds 0 to the end of the row if empty
    }

    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let cur_row = board[r];
        cur_row = slide(cur_row);
        board[r] = cur_row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    } 
}