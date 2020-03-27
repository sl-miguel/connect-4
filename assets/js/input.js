class InputHandler {

    constructor(canvas, player) {

        // Quand on clique (play)
        canvas.addEventListener('mouseup', function(event) {

            let rect = canvas.getBoundingClientRect();
            let mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
        
            player.play(mouse);
        
        });
        
        // Quand on bouge (show)
        canvas.onmousemove = function(event) {
        
            let rect = canvas.getBoundingClientRect();
            let mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
        
            player.show(mouse);
        
        };

        // Reset
        document.querySelector("#reset").addEventListener('click', function() {
            player.reset();
        });


        // Restart
        document.querySelector("#restart").addEventListener('click', function() {
            player.restart();
        });


        // Mode nuit
        const darkButton = document.querySelector('#dark');
        const lightButton = document.querySelector('#light');

        // Apply the cached cached theme on reload
        const theme = localStorage.getItem('theme');
        if (theme) document.body.className = theme;


        // Button Event Handlers
        darkButton.onclick = () => {
            document.body.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
        };

        lightButton.onclick = () => {
            document.body.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
        };

    }
}