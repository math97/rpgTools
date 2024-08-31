# Discord D&D 5e Bot

This bot application is designed to provide quick access to all the terms and rules found in the D&D 5e Player's Handbook. Whether you're a Dungeon Master or a player, this bot will be your ultimate companion in your D&D adventures.

## Features

- Quick Search: Easily search for any term or rule by using simple commands. The bot will provide you with the relevant information instantly.
- Interactive Commands: Engage with the bot through interactive commands to roll dice.

## How to Use

1. Invite the bot to your Discord server by following the provided link.
2. Grant necessary permissions to the bot to ensure it can function properly.
3. Start using the bot by typing commands in the designated channel.
4. Explore the vast database of D&D 5e terms and rules, and enjoy a seamless gaming experience.


## How to run Local

1. Invite the bot to your Discord server by following the provided link.
2. Grant necessary permissions to the bot to ensure it can function properly.
3. Add env
4. Run command "build"
5. Run the command "deploy:commands"
6. Run npm dev

Notice that steps 4,5 are necessary just when you need to register a new command for the bot


## Development Tasks

Here are some tasks that need to be completed for the development of this bot:
Notices:
    - [ ] We are using conventional commits

### MVP
- [ ] Implement a command to display the list of available spells.
- [ ] Implement a command to display the data from all default class on players handbook:
    - [ ] Implement a commanda race with filer giving two options for the user. Ex: "clerig" or "race clerig" where clerig after race is a filter with autocomplete
    - [X] Barbarian
    - [X] Bard
    - [X] Cleric
    - [ ] Druid
    - [ ] Fighter
    - [X] Monk
    - [ ] Paladin
    - [ ] Ranger
    - [ ] Rogue
    - [ ] Sorcerer
    - [ ] Warlock
    - [ ] Wizard
    - [ ] implement an embed or another form to show the specif features from each class like fury,spellslot's ...
- [X] Implement a command to display the data from all default races on players handbook:
    - [X] Dwarf
    - [X] Elf
    - [X] Halfling
    - [X] Human
    - [X] Dragonborn
    - [X] Gnome
    - [X] Half-Elf
    - [X] Half-Orc
    - [X] Tiefling
- [ ] Implement a command to display the data from all backgrounds in the Player's Handbook:
- [ ] Implement a command for rolling the dices we have on RPG:
    - [ ] should all row more than one dice in the same time like : "3d4"
    - [ ] should allo row with advantage and disadvantaged like : "2d4fdh1".( dh = drop high so will be 2d4[4,3] and will drop 4 and return just 3)
    - [ ] Implement a command to roll multiple dice at once like : "3d4 5d8" .(return the sum of the dices)
    - [ ] d4
    - [ ] d6
    - [ ] d8
    - [ ] d10
    - [ ] d12
    - [ ] d20
    - [ ] d100
- [ ] add response for based locale as ["pt-Br","en-US"]
- [ ] change images to be saved in the project and improve image itself(background ...)
- [ ] Improve embed style(Or change for another feature from discord to show the information)
- [ ] Improve folder structure pattern
- [ ] Improve types and functions
- [ ] Add test's
- [ ] Implement a command help

### Future Enhancements

- [ ] Add support for multi-server functionality.
- [ ] remove the necessity for slash commands
- [ ] Implement a command to allow users add their own homebrews for races,class...
- [ ] Implement a command to display the data from all itens in the Player's Handbook
- [ ] Implement a command to allow users add their own homebrews for itens
- [ ] Improve error handling and provide informative error messages.
- [ ] Create a feature to allow users to save their character sheets.
- [ ] Enhance the bot's user interface for a more intuitive experience.

Feel free to pick any task from the list and start working on it. If you have any questions or need assistance, don't hesitate to ask.


## Command Examples

- `/listraces`: List all races from D&D 5e
- `/races ${race name here}`: list information from a specif race
- `/monk`: List all details from class monk
- `1d20`: Roll a 20-sided dice.

## Support and Feedback

If you encounter any issues or have suggestions for improving the bot, please reach out to our support team. We value your feedback and are committed to enhancing your D&D gaming experience.
