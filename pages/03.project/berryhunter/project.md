---
title: 'Berry&ZeroWidthSpace;Hunter.io'
taxonomy:
  indexTag: game
  tag: webapplication
  typeOfWork: personal
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

[BerryHunter.io](https://berryhunter.io/) is a 2D multiplayer stone age survival game, playable directly in the browser.
Goal of the game is to survive coldness, hunger, animals and other players for as long as possible.
To help with this task the player can gather resources and craft tools and buildings.

**Team:**  
[Thomas Richner](http://trichner.ch): Back end development  
Xyckno: Graphics  
<a href="#contact" data-featherlight="#contact">Me</a>: Front end development, project coordination

**Technology:**  
We did not use any pre-existing game engine but rather wrote our own tick based engine and network layer.  
The front end uses [PixiJS v4](http://www.pixijs.com) as WebGL engine and pre-renders SVG textures as sprites.  
The back end simulates the game world for a fair multiplayer environment and is written in [Go](http://golang.org).  
The communication layer uses [FlatBuffers](https://google.github.io/flatbuffers) via web sockets and transports game 
states from server to clients and inputs from clients to the server.  
