input.onButtonPressed(Button.A, function () {
    if (shake < 2) {
        sprite.change(LedSpriteProperty.X, -1)
    }
    // this is only for the third game
    if (shake == 2) {
        if (guess > 0) {
            guess += -1
        }
        basic.showNumber(guess)
    }
})
// this verify if you guessed the correct number on third game
input.onButtonPressed(Button.AB, function () {
    if (shake == 2) {
        if (guess == random) {
            basic.showIcon(IconNames.Happy)
            game.addScore(1)
            random = randint(0, 10)
            game.setLife(3)
            basic.showNumber(game.score())
        } else {
            if (guess < random) {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    . # # # .
                    . # # # .
                    `)
                basic.pause(200)
                game.removeLife(1)
            } else {
                basic.showLeds(`
                    . # # # .
                    . # # # .
                    # # # # #
                    . # # # .
                    . . # . .
                    `)
                basic.pause(200)
                game.removeLife(1)
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (shake < 2) {
        sprite.change(LedSpriteProperty.X, 1)
    }
    // this is only for the third game
    if (shake == 2) {
        if (guess < 10) {
            guess += 1
        }
        basic.showNumber(guess)
    }
})
// This function change the games between one or another
input.onGesture(Gesture.Shake, function () {
    shake += 1
    game.setScore(0)
    // this deletes the pixel and player's sprite and give you life so you can play the third game
    if (shake == 2) {
        sprite.delete()
        pixel.delete()
        game.setLife(3)
    }
    // this reset the cycle of games
    if (shake > 2) {
        // Shake is a variable which is used to change the game
        shake = 0
    }
})
let pixel: game.LedSprite = null
let random = 0
let sprite: game.LedSprite = null
let shake = 0
let guess = 0
let bounce = 0
guess = guess
// Shake is a variable which is used to change the game
shake = 0
// this creates the player
sprite = game.createSprite(2, 4)
// speed of the game
let speed = 500
// this is used for the 3rd game, and it pick a random number
random = randint(0, 10)
game.setScore(0)
basic.forever(function () {
    // This way you can increase the speed of the falling pixel
    if (game.score() == 5 || game.score() == 10 || game.score() == 15) {
        speed += -50
    }
    basic.pause(200)
})
basic.forever(function () {
    // first game, in which you have to catch a falling pixel
    while (shake == 0) {
        pixel = game.createSprite(randint(0, 4), 0)
        for (let index = 0; index < 4; index++) {
            pixel.change(LedSpriteProperty.Y, 1)
            basic.pause(speed)
        }
        if (sprite.get(LedSpriteProperty.X) == pixel.get(LedSpriteProperty.X) && pixel.get(LedSpriteProperty.Y) == 4) {
            game.addScore(1)
            pixel.delete()
        } else {
            game.gameOver()
        }
    }
    // this is the second game, which creates a falling pixel you have to catch, but the pixel falls on diagonal.
    while (shake == 1) {
        pixel = game.createSprite(randint(0, 4), 0)
        while (pixel.get(LedSpriteProperty.Y) != 4) {
            if (pixel.get(LedSpriteProperty.X) == 0) {
                bounce += 1
            }
            if (pixel.get(LedSpriteProperty.X) == 4) {
                bounce = 0
            }
            if (bounce == 0) {
                pixel.change(LedSpriteProperty.X, -1)
                pixel.change(LedSpriteProperty.Y, 1)
            } else {
                pixel.change(LedSpriteProperty.X, 1)
                pixel.change(LedSpriteProperty.Y, 1)
            }
            basic.pause(speed)
        }
        if (sprite.isTouching(pixel) && pixel.get(LedSpriteProperty.Y) == 4) {
            game.addScore(1)
            pixel.delete()
        } else {
            if (shake == 1) {
                game.gameOver()
            } else {
                game.pause()
            }
        }
    }
})
