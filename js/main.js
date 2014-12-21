document.addEventListener("DOMContentLoaded", function() {
    /*
     'w' - wall
     'b' - box
     ' ' - free space
     'p' - player
     'g' - goal
    */
    var map = ["    wwwww          ","    w   w          ","    wb  w          ","  www  bww         ","  w  b b w         ","www w ww w   wwwwww","w   w ww wwwww  ggw","w b  b          ggw","wwwww www wpww  ggw","    w     wwwwwwwww","    wwwwwww        "],
        level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], []],
        field = document.getElementById('game-field'),
        x, y, dx, dy;

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            div = document.createElement('div');
            div.className = map[i][j] == ' ' ? 's' : map[i][j];
            level[i].push(div);
            field.appendChild(div);
            if (map[i][j] == 'p') {
                x = i;
                y = j;
            }
        }
    }

    window.addEventListener('keydown', function(e) {
        console.log('code = ', e.keyCode);
        switch (e.keyCode) {
            case 37:
                dx = -1; dy = 0;
                console.log('left');
                break;
            case 38:
                dx = 0; dy = 1;
                console.log('up');
                break;
            case 39:
                dx = 1; dy = 0;
                console.log('right');
                break;
            case 40:
                dx = 0; dy = -1;
                console.log('down');
                break;
            default:
                dx = 0; dy = 0;
                console.log('another key');
        }

    });

    console.log('x = ', x, 'y = ', y, 'class = ', level[x][y].className);
});