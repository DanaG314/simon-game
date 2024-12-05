<div align="center" id="banner">
    <img width="500" height="300" alt="simon banner" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRYn-iT4BlCSGK_GBQvBEHyOO4tx1ZEYSqA&s">
</div>

<div align="center" id="header">

# 🕹️ Simon

</div>

## Description

Simon is a short-term memory game where the player must repeat an increasing sequence of lights and sounds. The game begins with Simon playing his sequence, and the player mimics the sequence in order to make it to the next round. Each round Simon adds another step to the sequence making it harder to remember. The game ends when a player enters an incorrect sequence.

## 📸 Screenshots

|      Screenshot       |                      Description                      |
| :-------------------: | :---------------------------------------------------: |
| **Simon's Sequence**  | <img src="/images/Simon&apos;s Turn.png" width="300"> |
| **Player's Sequence** |    <img src="/images/Player turn.png" width="300">    |
|    **Next Round**     |    <img src="/images/Next Round.png" width="300">     |

## 💻 Technologies Used

![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)
![CSS3](https://img.shields.io/badge/-CSS_Grid-05122A?style=flat&logo=css3)
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)  
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)
![Github](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)
![VSCode](https://img.shields.io/badge/-VS_Code-05122A?style=flat&logo=visualstudio)

## 🧩 Getting Started

Click to play [Simon!][link]

[link]: https://danag314.github.io/simon-game/

<summary>🎮 Game Instructions</summary>

1. Press the `START` button.
2. Simon will play his sequence.
3. Choose the same pattern as Simon by clicking on the correct pads.
4. If your sequence matches Simon's sequence `NEXT ROUND` starts, the process will repeat but with another color added this time.
5. If incorrect press the `RESET` button to reset the game, and then press `START` to play again.

</details>

<details open>
<summary>📋 Planning</summary>

![Simon Wireframe](./images/wireframe.PNG)

- One player game
- Player clicks `START` button triggers the countdown to start the game
- Simon starts its random 4 index pattern, pads light up with delay in between so that player is able to better remember pattern. Pads also have their own sound.
- Once Simon is done its pattern, its the players turn to click the correct pattern. If player pattern is equal to Simons pattern, the next round starts to play.
- If player enters one incorrect pad pattern it is `GAME OVER`.
- When player enters next round, Simon plays the same pattern as the last but adds another pad to the pattern at the end.
- When it is `GAME OVER` there is a `RESET` button that will reset the game and player can click `START` again to start a new game.

</details>

## 🚶🏻‍➡️ Next Steps

- Add a `GAME OVER` sound that plays, and show text as red.
- Make the `RESET` button animated.
- Add a `Best Score` feature.
