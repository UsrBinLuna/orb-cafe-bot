# Orbital Cafe bot
This is the bot for the Orbital Cafe Discord server

# Dependencies
Windows/MacOS
https://nodejs.org/en/ (It will download NodeJS and npm)

Linux

- Debian based
`sudo apt-get install nodejs npm`
- Arch based
`sudo pacman -S nodejs npm`
- Fedora
`sudo dnf install nodejs npm`
- OpenSUSE
`sudo zypper in nodejs npm`

# How to download and run the bot
1. Download all dependencies 
2. Run `git clone https://github.com/rogerpanza/orb-cafe-bot`, if you don't have Git installed, download it from https://git-scm.com/ or if on Linux, run
- Debian/Ubuntu based
`sudo apt-get install git`
- Arch based
`sudo pacman -S git`
- Fedora
`sudo dnf install git`
- OpenSUSE
`sudo zypper in git`

3. On the cloned repo's root folder, open a terminal and run
`npm install --save discord.js`, that should install discord.js to your project folder
4. Open `config.js` with a text editor of your choice, and edit it to include your bot's token and your server's ID
5. To run the bot, do `node .`, or if you're using MacOS/Linux, its recommended to run `node . 2> log.txt` so the errors go to a file
