/*
 * Square Game/ARS
 *
 * TODO: Multiplayer
 *
 */

function noop() {}

//console.log = noop;

var dead = false;
var onDeath = noop;

window.RPG = function (ctx, map, scoreEle) {
  var _mapMeanings = {
    " ": {
      color: "#000000"
    },
    "E": {
      color: "#af0000"
    },
    "S": {
      color: "#ff9800"
    },
    "1": {
      color: "green"
    },
    "2": {
      color: "darkgreen"
    }
  };
  var _enemyLocations = [];
  var _health = 1;
  var over = false;
  var _enemyTick = function (perferAxis) {
    switch (_turnCount % 12) {
      case 0:
        _enemyLocations.push({x: 0, y: 0});
        break;
      case 3:
        _enemyLocations.push({x: 0, y: 31});
        break;
      case 6:
        _enemyLocations.push({x: 31, y: 0});
        break;
      case 9:
        _enemyLocations.push({x: 31, y: 31});
        break;
    }
    if (!perferAxis) perferAxis = "y";
    console.log(perferAxis);
    console.log("enemy locations", _enemyLocations)
    _enemyLocations.forEach(function (enemy, index) {

      var xDistance = enemy.x - _player[_currentPlayer].X;
      var yDistance = enemy.y - _player[_currentPlayer].Y;
      
      if (xDistance > 0.5) xDistance = -1;
      else if (xDistance < -0.5) xDistance = 1;
      else xDistance = 0;
      
      if (yDistance > 0.5) yDistance = -1;
      else if (yDistance < -0.5) yDistance = 1;
      else yDistance = 0;
      
      if ((xDistance !== 0) && (yDistance !== 0)) {
        if ((_turnCount % 2) === 0) {
          xDistance = 0;
        } else {
          yDistance = 0;
        }
      }
      
      var newCoords = _putInBounds(enemy.x + xDistance, enemy.y + yDistance);
      xDistance = newCoords.x;
      yDistance = newCoords.y;
      
      var conflict = false;
      enemy.current = true;
      for (enemyName in _enemyLocations) {
        // Ignore ourself
        if (_enemyLocations[enemyName].current) continue;
        if ((_enemyLocations[enemyName].x === xDistance) && (_enemyLocations[enemyName].y === yDistance)) {
          console.log(enemyName, "unable to move due to", _enemyLocations[enemyName]);
          conflict = true;
          break;
        }
      }
      enemy.current = false;
      
      if (!conflict) {
        enemy.x = xDistance;
        enemy.y = yDistance;
      }
      
      if ((enemy.x === _player[1].X) && (enemy.y === _player[1].Y)) {
        _health--;
        dead = true;
        if (onDeath === noop) {
          over = true;
          document.body.style.opacity = "0.15";
          setTimeout(function () {
            var oldDur = getComputedStyle(document.body).transitionDuration;
            document.body.style.transitionDuration = "0s";
            document.body.style.opacity = "1";
            document.body.style.transitionDuration = oldDur;
            document.body.innerHTML = `
              <h2>You lost...</h2>
              <div>
                Final score: ${_turnCount}
              </div>
              <div>
                <a href="javascript:location.reload()">Try again</a>
              </div>
            `;
          }, 750);
          //location.reload();
        } else {
          onDeath();
        }
      }
      /*if ((enemy.x === _player[2].X) && (enemy.y === _player[2].Y)) {
        _health--;
        dead = true;
        if (onDeath === noop) {
          alert("You lost, player 2.");
          location.reload();
        } else {
          onDeath();
        }
      }*/
      
      _enemyLocations[index] = enemy;
    });
  };
  var _putInBounds = function (x, y) {
    if (x > 31) {
      x = 31;
    }
    if (y > 31) {
      y = 31;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    return {x: x, y: y};
  };
  var _player = {};
  _player[1] = {
    X: 16,
    Y: 16
  };
  _player[2] = {
    X: 24,
    Y: 16
  };
  this.render = function () {
    //return; //make learning faster
    window.scroll(0, 0);

    score.innerText = _turnCount;
    
    map.forEach(function (mapRow, y) {
      for (var x = 0; x < mapRow.length; x++) {
        let mapTile = mapRow[x];
        if (mapTile === "E") {
          mapTile = " ";
        }
        ctx.fillStyle = _mapMeanings[mapTile].color;
        if (y === 31) {
          if (_health > x) {
            //ctx.fillStyle = "white";
          }
        }
        ctx.fillRect(x, y, 1, 1);
      }
    });
    
    ctx.fillStyle = _mapMeanings["E"].color;
    _enemyLocations.forEach(function (enemy) {
      ctx.fillRect(enemy.x, enemy.y, 1, 1);
    });
    
    ctx.fillStyle = _mapMeanings["1"].color;
    ctx.fillRect(_player[1].X, _player[1].Y, 1, 1);
    //ctx.fillStyle = _mapMeanings["2"].color;
    //ctx.fillRect(_player[2].X, _player[2].Y, 1, 1);
  };
  var _turnCount = 0;
  var _currentPlayer = 1;
  this.parseKeyPress = function (e) {
    if (over) return;
    var perferAxis = "y";
    switch (e.keyCode) {
      case 40: // Down arrow
      case 83: // S
        _player[_currentPlayer].Y++;
        break;
      case 38: // Up arrow
      case 87: // W
        _player[_currentPlayer].Y--;
        break;
      case 39: // Right arrow
      case 68: // D
        perferAxis = "x";
        _player[_currentPlayer].X++;
        break;
      case 37: // Left arrow
      case 65:
        perferAxis = "x";
        _player[_currentPlayer].X--;
        break;
      default:
        return;
        break;
    }
    _turnCount++;
    var newCoords = _putInBounds(_player[_currentPlayer].X, _player[_currentPlayer].Y);
    _player[_currentPlayer].X = newCoords.x;
    _player[_currentPlayer].Y = newCoords.y;
    //if ((_turnCount % 10) === 0) _health++;
    //if (_health > 1) _health = 1;
    _enemyTick(perferAxis);
    this.render();
    /*if (_currentPlayer === 1) {
      _currentPlayer = 2;
    } else {
      _currentPlayer = 1;
    }*/
  };
  this.render();
  //var r = this.render;setInterval(function () {_turnCount++;_enemyTick();r();}, 0)
};

var myRPG = new RPG(document.getElementById("game").getContext('2d'), window.MAP, document.getElementById("score"));
window.onkeyup = function (e) {
  myRPG.parseKeyPress(e);
  e.preventDefault();
  return false;
};
/*
//AI
//console.clear();
var storageKey = "SmittyRules123";
if (!localStorage[storageKey + "_chain"]) {
  localStorage[storageKey + "_chain"] = JSON.stringify(new Array(100).fill(new Array(150).fill(38)));
  localStorage[storageKey + "_score"] = 0;
}
var oldChain = JSON.parse(localStorage[storageKey + "_chain"]);
var newChains = JSON.parse(localStorage[storageKey + "_chain"]);
var oldLength = parseInt(localStorage[storageKey + "_score"]);

// mutate

for (chainName in newChains) {
  let newChain = newChains[chainName];
  var mutations = Math.floor(Math.random() * 35) + 1;
  for (var i = 0; i < mutations; i++) {
    newChain[Math.floor(Math.random() * newChain.length)] = Math.floor(Math.random() * 4) + 37; //gives a small chance of increasing size
  }
}

onDeathA = function () {
  console.log("score:", parseInt(score.innerText, 10));
  //better than before?
  if (parseInt(score.innerText, 10) > oldLength) {
    localStorage[storageKey + "_score"] = parseInt(score.innerText, 10);
    localStorage[storageKey + "_chain"] = JSON.stringify(newChain);
  }
  console.warn("Best:", parseInt(localStorage[storageKey + "_score"]));
  location.reload();
}
console.log = function () {};
function doChain(moveChain) {
  if (dead) return;
  var counter = 0;
  for (code in moveChain) {
    let move = moveChain[code];
    setTimeout(function () {
      if (dead) return;
      myRPG.parseKeyPress({keyCode: move});
    }, (++counter) * 60);
  }
}
function reset() {
  _playerX = 16;
  _playerY = 16;
  _enemyLocations = [];
}
//doChain(newChain);*/