# Overview

## Server

### Game
* players, []
* balls, []
* powerups, []
* current_tick int
* update(dt)
* init()
* main(client1, client2)

### Player
* score, int
* name, string
* snake, Snake
* connection, FOO
* in_goal(Ball)

### Snake
* blocks, [(x,y)]
* head_orientation, int
* color, int
* vx, float
* vy, float
* uuid, int

### Ball
* x, float
* y, float
* color, int
* vx, float
* vy, float
* uuid, int
* move(dt)

### Powerup
* x, float
* y, float
* on_touch(Player, Game) {player.connection.emit("foo", ..)}

### Ideas for Powerups
* increase / decrease snake length
* increase / decrease balls velocity
* more balls
* change theme
* freeze opponent / get frozen
* add "lifes"
* sweets -> influence gravity
* invert snake direction (of opponent)
* mushroom -> weird visual effects
* alcohol -> some other weird stuff
* second snake
* ghost mode
* mirror screne

## Client-Server Communication

### Client -> Server
* 'move', {degree: <integer>}