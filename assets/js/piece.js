class Piece {

    constructor(canvas, board) {

        this.board = board;

        this.game = {
            width: canvas.width,
            height: canvas.height
        }
        

        this.position = {
            x: 0,
            y: 500
        }

    }

    draw(ctx, column, y, color) {

        this.position.x = column;
        this.position.y = y;

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(this.position.x + this.board.size.cell.width / 2, (this.position.y * this.board.size.cell.height) + this.board.size.cell.height / 2, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.arc(this.position.x + this.board.size.cell.width / 2, (this.position.y * this.board.size.cell.height) + this.board.size.cell.height / 2, 41, 0, Math.PI * 2);
        ctx.stroke();
        

    }

    highlight(ctx, column, y, color) {

        this.position.x = column;
        this.position.y = y;

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.position.x + this.board.size.cell.width / 2, (this.position.y * this.board.size.cell.height) + this.board.size.cell.height / 2, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = '#3867d6';
        ctx.strokeStyle = this.board.style.board.color;
        ctx.arc(this.position.x + this.board.size.cell.width /2, (this.position.y * this.board.size.cell.height) + this.board.size.cell.height / 2, 40, 0, Math.PI * 2);
        ctx.stroke();
        

        // 😕 Tristesse
        ctx.globalAlpha = 0.3; 
        // ctx.fillStyle = "black";
        // ctx.fillRect(this.position.x, 0, this.board.size.cell.width, this.board.size.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.position.x + 2, 1, this.board.size.cell.width - 4, this.board.size.height-1);

        ctx.globalAlpha = 1;




    }

    clearHighlight(ctx, lastPos, y) {

        ctx.globalCompositeOperation = 'destination-out';

        ctx.arc(lastPos * this.board.size.cell.width + (this.board.size.cell.width / 2), y * this.board.size.cell.height + (this.board.size.cell.height / 2), 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.globalCompositeOperation = 'source-over';


    }

    clearRect(ctx) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.board.style.board.color;
        ctx.strokeRect(this.position.x + 2, 1, this.board.size.cell.width - 4, this.board.size.height-1);
    }

    drawWin(ctx, x, y) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#6ff975';
        ctx.arc((x * this.board.size.cell.width) + (this.board.size.cell.width / 2), (y * this.board.size.cell.height) + (this.board.size.cell.height / 2), 40, 0, Math.PI * 2);
        ctx.stroke();
    }

}