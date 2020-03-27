// Canvas constantes
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const width = 700
const height = 600;
canvas.width = width;
canvas.height = height;


// Create objects
let board = new Board(canvas);
let piece = new Piece(canvas, board);
let player = new Player(board, piece);
new InputHandler(canvas, player);

// Display & create board 
board.create();
board.draw(ctx);

