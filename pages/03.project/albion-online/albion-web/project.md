---
title: 'Albion Publishing'
date: 01-07-2020
taxonomy:
  typeOfWork: professional
  language:
    - java
    - springboot
    - react
    - jquery
    - php
  series: albiononline
  promoted: frontpage
thumbnail:
  extension: jpg
displayTypes:
  screenshots:
    title: Mobile Pre-Registration
    2021-06-05 Homepage with Mobile Pre-Registration (Desktop): |
      Desktop Homepage
    2021-06-05 Homepage with Mobile Pre-Registration (Mobile): |
      Mobile Homepage
  video:
    title: Asia Launch Page
    file: 2023-03-19 Asia Launch Page.mp4
  video2:
    title: Europe Launch Page
    file: 2024-04-28 Europe Launch Page.mp4
---
## Achievements

_As a disclaimer, none of these projects happened in a vacuum. A lot of super talented people from the company and especially the game side of Sandbox Interactive made these successes possible. I'm outlining the parts that I supervised and developed, but will list the measured results that contain the efforts of everyone involved._

### Android and iOS Platform Release <small>(Jun 2021)</small>

Together with a team of 3 developers at the time, we 
- implemented Apple App Store as payment provider
- implemented Google Play as payment provider
- implemented catalog syncing to both platforms
- designed and implemented a pre-registration flow on our website

**Result:** DAU went from **140,000** to **270,000**.

### Asia Server Release <small>(March 2023)</small>

I grew the team to 5 developers and together we:
- reorganized our infrastructure to split between global processing (purchases, accounts) and datacenter processing (characters, game data)
- set up a second infrastructure shard in Singapore (as opposed to our previously existing Washington, DC infrastructure)
- designed and implemented a launch page
- implemented shop support for new founder packs

**Result:** DAU went from **150,000** to **300,000**. Revenue increased by 90% year over year.

### Europe Server Release <small>(April 2024)</small>

Now with my team of 6 developers we:
- copied the previous efforts of the Asia Server release
- optimized the launch page look & feel
- supported cross- and upgrading for Europe founder packs

**Result:** DAU went from **245,000** to **358,000**. Revenue increased by 40% year over year.

<!-- - Introduction of S2S tracking, pioneering true cross-platform seamless tracking
    - Google Ads
    - Google Analytics 3
    - Google Analytics 4
    - Facebook -->

### Tech Stack clean-up

Apart from the specific launches that brought in thousands of new players and big revenue jumps, my main goal was the future-proofing of the wast infrastructure I inherited. What my team achieved:
- Removed languages and frameworks: CoffeeScript, DropWizard
- Kept languages and frameworks: Java 8, Spring Boot 2, React
- Introduced: GitLab as VCS, RabbitMQ as MessageBroker
- Performance optimizations to grow the shop (and underlying infrastructure) from around 80 concurrent requests per second to about 1500 requests per second.

---
<small>© Sandbox Interactive GmbH — used with permission for personal portfolio.
Albion Online® and related images are property of their respective owners.</small>
