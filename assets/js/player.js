class Player {

    constructor(board, piece) {

        this.players = {

            p1:  {
                name: "Player 1",
                score: 0,
                color: "#ff0000"
            },

            p2: {
                name: "Player 2",
                score: 0,
                color: "#ffff00"
            }
        }

        this.turn = 1;
        this.piece = piece;
        this.board = board;
        this.position = null;
        this.lastPos = null;

        this.played = false;
        this.isWin = false;
    }

    show(mouse) {

        if (this.isWin) return;

        for (let x = 0; x < this.board.rule.columns; x++) {


            this.position = x * this.board.size.cell.width;


            if (mouse.x >= this.position && mouse.x <= this.position + this.board.size.cell.width) {
                
                // Si la derniere position égale a la position actuelle ne rien faire
                if (this.lastPos === this.position) {
                    // console.log(this.lastPos)
                    return;
                }

    
                // Si quelqu'un a joué, ne pas clear la zone
                if (!this.played) {
                    piece.clearHighlight(ctx, this.lastPos);
                }

                piece.clearRect(ctx);
                
                for (let y = this.board.rule.rows - 1; y >= 0; y--) {

                    if (this.board.table[y][x] === "") {


                        // Player 1 = red
                        if (this.turn === 1) {
                            piece.highlight(ctx, this.position, y, this.players.p1.color);
                        }

                        // Player 2 = Yellow
                        else {
                            piece.highlight(ctx, this.position, y, this.players.p2.color);
                        }
                        
                        this.played = false;
                        this.lastPos = this.position
                        break;

                    }
                    
                }

                break;
            }

            
        }
    }

    play(mouse) {

        if (this.isWin === true) return;

        for (let x = 0; x < this.board.rule.columns; x++) {
            
            this.position = x * this.board.size.cell.width;
    
            if (mouse.x >= this.position && mouse.x <= this.position + this.board.size.cell.width) {
    
                for (let y = this.board.rule.rows - 1; y >= 0; y--) {
                    
                    if (this.board.table[y][x] === "") {
    
                        if (this.turn === 1) {
    
                            this.piece.draw(ctx, this.position, y, this.players.p1.color);
                            this.turn = 2;
                        }
    
                        else {
    
                            this.piece.draw(ctx, this.position, y, this.players.p2.color);
                            this.turn = 1;
                        }

    
                        this.played = true;
                        this.board.table[y][x] = this.turn;
                        // console.table(board.board);
                        // this.board.isWin();


                        if (this.board.isWin(this.piece)) {

                            this.isWin = true;
                            
                            if (this.turn === 1) {
                                this.players.p2.score++;
                                board.drawWinText(ctx, this.players.p2);
                            } 
                            
                            else {
                                this.players.p1.score++;
                                board.drawWinText(ctx, this.players.p1);
                            }

                            this.updateScore(this.players.p1.score, this.players.p2.score);
                            
                        } 
                        else {

                            if(this.board.isTie()) {
                                board.drawTieText(ctx);
                            }

                        }

                        break;
    
                    }
                    
                }
                
            }
        }
    }


    // Update score on website
    updateScore(p1, p2) {
        document.querySelector("#p1").innerHTML = p1;
        document.querySelector("#p2").innerHTML = p2;
    }


    // Reset les scores et le jeu
    reset() {

        this.isWin = false;
        this.players.p1.score = 0;
        this.players.p2.score = 0;
        this.updateScore(this.players.p1.score, this.players.p2.score);
        board.table = [];
        board.create();
        board.draw(ctx);
        
    }

    // Relance une nouvelle partie
    restart() {

        this.isWin = false;
        board.table = [];
        board.create();
        board.draw(ctx);

    }

}