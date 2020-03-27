
class Board {

    constructor(canvas) {

        // BOARD ARRAY
        this.table = [];

        // BOARD RULES
        this.rule = {

            // 6, 7
            rows: 6,
            columns: 7,

            connect: 4

        }

        // BOARD SIZES
        this.size = {

            width: canvas.width,
            height: canvas.height,

            cell: {
                width: width / this.rule.columns,
                height: height / this.rule.rows
            }

        }

        // BOARD STYLES
        this.style = {

            board: {
                color: "#3867d6",
            }, 

            line: {
                color: "#ddd",
                width: 5
            }

        }


    }

    // CREATE BOARD ARRAY
    create() {

        // Lignes
        for (let i = 0; i < this.rule.rows; i++) {

            // Push new array
            this.table.push([]);

            // Colonnes
            for (let j = 0; j < this.rule.columns; j++) {

                // Push empty string
                this.table[i].push("")

            }

        }

    }

    // CHECK CONNECT 4
    isConnect4(a, b, c, d) {
        return (a === b && b === c && c === d && a !== "")
    }

    // CHECK WIN
    isWin(piece) {

        // HORIZONTAL
        // I: 0 <=> 5
        // J: 0 <=> 3
        for (let i = 0; i < this.rule.rows; i++) {
            for (let j = 0; j < Math.ceil(this.rule.columns / 2); j++) {


                if (this.isConnect4(this.table[i][j], this.table[i][j + 1], this.table[i][j + 2], this.table[i][j + 3])) {

                    // DRAW PIECE HINT 4 TIMES
                    for (let k = 0; k < 4; k++) {
                        
                        // CODE DRAW PIECE HERE
                        piece.drawWin(ctx, j + k, i);

                    }

                    return true;

                }
            }
        }

        // VERTICAL
        // I: 0 <=> 2
        // J: 0 <=> 6
        for (let i = 0; i < Math.ceil(this.rule.rows / 2); i++) {
            for (let j = 0; j < this.rule.columns; j++) {


                if (this.isConnect4(this.table[i][j], this.table[i + 1][j], this.table[i + 2][j], this.table[i + 3][j])) {

                    // DRAW PIECE HINT 4 TIMES
                    for (let k = 0; k < 4; k++) {
                        
                        // CODE DRAW PIECE HERE
                        piece.drawWin(ctx, j, i + k);

                    }

                    return true;

                }
            }
        }

        // DIAGONAL LEFT TO RIGHT
        // I: 0 <=> 2
        // J: 0 <=> 3
        for (let i = 0; i < Math.ceil(this.rule.rows / 2); i++) {
            for (let j = 0; j < Math.ceil(this.rule.columns / 2); j++) {


                if (this.isConnect4(this.table[i][j], this.table[i + 1][j + 1], this.table[i + 2][j + 2], this.table[i + 3][j + 3])) {

                    // DRAW PIECE HINT 4 TIMES
                    for (let k = 0; k < 4; k++) {
                        
                        // CODE DRAW PIECE HERE
                        piece.drawWin(ctx, j + k, i + k);

                    }

                    return true;

                }
            }
        }


        // DIAGONAL RIGHT TO LEFT 
        // I: 0 <=> 2
        // J: 3 <=> 6
        for(let i = 0; i < Math.ceil(this.rule.rows / 2); i++){
            for(let j = this.rule.columns - 1; j >= Math.floor(this.rule.columns / 2); j--){

                if(this.isConnect4(this.table[i][j], this.table[i + 1][j - 1], this.table[i + 2][j - 2], this.table[i + 3][j - 3])){
                    
                    // DRAW PIECE HINT 4 TIMES
                    for (let k = 0; k < 4; k++) {

                        // CODE DRAW PIECE HERE
                        piece.drawWin(ctx, j - k, i + k);

                    }

                    return true;

                }
            }
        }
    }

    // CHECK TIE
    isTie() {
    
        let index = 0;
        for (let i = 0; i < this.rule.rows; i++) {
            
            for (let j = 0; j < this.rule.columns; j++) {

                if (this.table[i][j] === 1 || this.table[i][j] === 2) {
                    index++;
                }

                if (index === this.rule.columns * this.rule.rows) {
                    return true;
                }

            }
        }
    }

    // =========================== DRAW PART ============================ //

    // DRAW BOARD ON CANVAS
    draw(ctx) {

        ctx.fillStyle = this.style.board.color;
        ctx.fillRect(0, 0, this.size.width, this.size.height);

        ctx.globalCompositeOperation = 'destination-out';

        for (let x = 0; x < this.rule.columns; x++) {
            
            for (let y = 0; y < this.rule.rows; y++) {
                
                // CREATE DOTS
                ctx.beginPath();
                ctx.arc(x * this.size.cell.width + this.size.cell.width / 2, y * this.size.cell.height + this.size.cell.height / 2, 40, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

                // SOFTENING HOLES
                // ctx.beginPath();
                // ctx.arc(x * this.size.cell.width + this.size.cell.width / 2, y * this.size.cell.height + this.size.cell.height / 2, 40, 0, Math.PI * 2);
                // ctx.stroke(); 
                // ctx.closePath();

            }
        }

        ctx.globalCompositeOperation = 'source-over';

    }

    // DRAW WIN SCREEN
    drawWinText(ctx, player) {

        // BACKGROUND WITH SOME OPACITY
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, this.size.width, this.size.height);
        ctx.globalAlpha = 1;

        // FONT
        ctx.font = "60px ozyv";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 30;
        ctx.fillStyle = player.color;
        ctx.textAlign = "center";
        ctx.fillText(`${player.color} wins`, (this.size.width / 2) - 13, this.size.height / 2);
        ctx.shadowBlur = 0;

    }

    // DRAW TIE SCREEN
    drawTieText(ctx) {

        // BACKGROUND WITH SOME OPACITY
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, this.size.width, this.size.height);
        ctx.globalAlpha = 1;

        // FONT
        ctx.font= "60px ozyv";
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 30;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`Its a tie`, (this.size.width / 2) - 13, this.size.height / 2);
        ctx.shadowBlur = 0;
    }

}