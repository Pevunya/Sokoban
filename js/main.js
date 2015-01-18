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
    var map,
        level,
        gameField = $('#game-field'),
        x, y, dx, dy,
        cell, nextCell, nextNextCell;

    getSelectedLevel();

    function getSelectedLevel() {
        var selectedLevel = $(".select-level:checked").val();

        switch (parseInt(selectedLevel)) {
            case 1:
                map = ["wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwww   wwwwwwwwwwww","wwwwwwb  wwwwwwwwwwww","wwwwww  bwwwwwwwwwwww","wwww  b b wwwwwwwwwww","wwww w ww wwwwwwwwwww","ww   w ww wwwww  ggww","ww b  b          ggww","wwwwww www wpww  ggww","wwwwww     wwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], [],[],[]];
                break;
            case 2:
                map = ["wwwwwwwwwwwwwwww","wwwwwwwwwwwwwwww","wwgg  w     wwww","wwgg  w b  b  ww","wwgg  wbwwww  ww","wwgg    p ww  ww","wwgg  w w  b www","wwwwwww wwb b ww","wwww b  b b b ww","wwww    w     ww","wwwwwwwwwwwwwwww","wwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[],[],[],[],[]];
                break;
            case 3:
                map = ["wwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwww","wwwwwwwwww     pwww","wwwwwwwwww bwb wwww","wwwwwwwwww b  bwwww","wwwwwwwwwwwb b wwww","wwwwwwwwww b w wwww","wwgggg  ww b  b  ww","wwwggg    b  b   ww","wwgggg  wwwwwwwwwww","wwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[],[],[],[],[]];
                break;
            case 4:
                map = ["wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwww  ggggww","wwwwwwwwwwwww  ggggww","ww    w  b b   ggggww","ww bbbwb  b w  ggggww","ww  b     b w  ggggww","ww bb wb b bwwwwwwwww","ww  b w     wwwwwwwww","www wwwwwwwwwwwwwwwww","ww    w    wwwwwwwwww","ww     b   wwwwwwwwww","ww  bbwbb  pwwwwwwwww","ww    w    wwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], [], [],[],[],[],[]];
                break;
            case 5:
                map = ["wwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwww","wwwwwwwwww   wwwwww","wwwwwwwwww wbww  ww","wwwwwwwwww     b ww","wwwwwwwwww www   ww","wwgggg  ww b  bwwww","wwgggg    b bb wwww","wwgggg  wwb  b pwww","wwwwwwwwww  b  www","wwwwwwwwww b b  www","wwwwwwwwwwww ww www","wwwwwwwwwwww    www","wwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], [],[],[],[],[]];
                break;
            default:
                map = ["wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwww   wwwwwwwwwwww","wwwwwwb  wwwwwwwwwwww","wwwwww  bwwwwwwwwwwww","wwww  b b wwwwwwwwwww","wwww w ww wwwwwwwwwww","ww   w ww wwwww  ggww","ww b  b          ggww","wwwwww www wpww  ggww","wwwwww     wwwwwwwwww","wwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwww"];
                level = [[], [] ,[] ,[] ,[] ,[] ,[] ,[], [], [], [],[],[]];
        }

        var colsAmount = map[0].length,
            rowsAmount = map.length,
            cellSize = 40;

        gameField.css('width', colsAmount * cellSize);
        gameField.css('height', rowsAmount * cellSize);

        gameField.empty();

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                div = document.createElement('div');
                div.className = map[i][j] == ' ' ? 's' : map[i][j];
                level[i].push(div);
                gameField.append(div);
                if (map[i][j] == 'p') {
                    x = j;
                    y = i;
                }
            }
        }
    }

    document.addEventListener("change", getSelectedLevel);

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

        console.log('level', y + dy + dy, x + dx+ dx);

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

        playSound("media/tada.mp3");
        alert('Level completed!');

    });

    function playSound(soundfile) {
        $("#sound").html("<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />");
    }
});