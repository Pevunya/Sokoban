document.addEventListener("DOMContentLoaded", function() {
    /*
     'w' - wall
     'b' - box
     ' ' - free space
     'p' - player
     'g' - goal
     'bg' - box in the goal
     'pt' - path
    */
    var map = ["    wwwww          ","    w   w          ","    wb  w          ","  www  bww         ","  w  b b w         ","www w ww w   wwwwww","w   w ww wwwww  ggw","w b  b          ggw","wwwww www wpww  ggw","    w     wwwwwwwww","    wwwwwww        "],
        level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], []],
        field = document.getElementById('game-field'),
        x, y, dx, dy,
        cell, nextCell, nextNextCell;

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            div = document.createElement('div');
            div.className = map[i][j] == ' ' ? 's' : map[i][j];
            level[i].push(div);
            field.appendChild(div);
            if (map[i][j] == 'p') {
                x = j;
                y = i;
            }
        }
    }

    window.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37:
                dx = -1; dy = 0;
                break;
            case 38:
                dx = 0; dy = -1;
                break;
            case 39:
                dx = 1; dy = 0;
                break;
            case 40:
                dx = 0; dy = 1;
                break;
            default:
                dx = 0; dy = 0;
        }

        var cell = level[y][x],
            nextCell = level[y + dy][x + dx],
            nextNextCell = level[y + dy + dy][x + dx + dx];

        if (nextCell.className !== 'w') {
            if (nextCell.className == 'b' || nextCell.className == 'bg') {
                if (nextNextCell.className == 'w' || nextNextCell.className == 'b' || nextNextCell.className == 'bg')
                    return;
                nextNextCell.className = nextNextCell.className == 'g' ? 'bg' : 'b';
                nextCell.className = nextCell.className == 'bg' ? 'g' : 's';
            }

            cell.className = cell.className == 'P' ? 'g' : 's';
            cell.className = cell.className == 's' ? 'pt' : 'g';
            nextCell.className = nextCell.className == 'g' ? 'P' : 'p';
            x += dx; y += dy;
        }

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j].className == 'b') return;
            }
        }

        alert('Level completed!');
        playSound("media/tada.mp3");

    });

    function playSound(soundfile) {
        document.getElementById("dummy").innerHTML=
            "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
    }
});