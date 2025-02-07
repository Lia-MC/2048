var board;
var score = 0;
var rows = 4;
cols = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
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

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        alert("Game Over. Thanks for playing!");
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if (board[r][c] == 0) { // this isnt working...
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
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
    // initialboard = board;
    if (e.code == "ArrowLeft") {
        slideLeft();
        // if (board != initialboard) {
        //     setTwo();
        // }
        setTwo();
    } 
    else if (e.code == "ArrowRight") {
        slideRight();
        // if (board != initialboard) {
        //     setTwo();
        // }
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        // if (board != initialboard) {
        //     setTwo();
        // }
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        // if (board != initialboard) {
        //     setTwo();
        // }
        setTwo();
    }
    document.getElementById("score").innerText = score;
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

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let cur_row = board[r];
        cur_row.reverse();
        cur_row = slide(cur_row);
        cur_row.reverse();
        board[r] = cur_row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    } 
}

function slideUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}