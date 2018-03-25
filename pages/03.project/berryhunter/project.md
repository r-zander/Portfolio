---
title: 'BerryHunter'
taxonomy:
  tagLvl0: game
  tag: [webapplication]
  typeOfWork: unpaid
  language:
    - css
    - html
    - javascript
    - pixi.js
  promoted: highlight
displayTypes:
  screenshot:
    title: "Splash Screen"
    file: jpg
    caption: "'The Berry Hunter' by [Sebastian Galli](https://www.linkedin.com/in/sebastian-galli-936438122/)"
  liveSite:
    url: "https://berryhunter.io/"
thumbnail:
  extension: jpg
---

[BerryHunter](https://berryhunter.io/) is a 2D stone age survival game, playable directly in the browser.
Goal of the game is to survive coldness, hunger, animals and other players for as long as possible.
To help with this task the player can gather resources and craft tools and buildings.

**Team:**  
[Thomas Richner](http://trichner.ch): Back end development
Xyckno: Graphics  
Me: Front end development, project coordination

**Technology:**  
The front end uses [PixiJS v4](http://www.pixijs.com) as WebGL engine and pre-renders SVG textures as sprites.  
The back end is written in [Go](http://golang.org), the communication layer uses [FlatBuffers](https://google.github.io/flatbuffers) via web sockets.  
We did not use any pre-existing game engine but rather wrote our own tick based engine and network layer.