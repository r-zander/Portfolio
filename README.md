# Portfolio
Source code of my personal portfolio website.

You can visit the live website here: http://rza.io

## Installation

1. Download [Grav + Admin Plugin](https://getgrav.org/downloads)
2. Copy this repository into `grav-admin\user` and overwrite any
file already present in the grav installation
    1. Delete `grav-admin\user\pages\01.home\defaul.md` and
       `grav-admin\user\pages\02.typography\`
3. Point your (local) web server to the `grav-admin` folder

## Software Versions

- Grav 1.6.x
- PHP 7.x

## Architecture

- Themes: Contains the portfolio-theme to hold all the layout,
design and functionality
- Data: Contains bigger binary files (not included in the code
repository) like PSD and PDF files
- Pages: Contains the structured actual content of the
portfolio