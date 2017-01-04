const emoji = require('node-emoji')
const view = require('../views/add-stat-point')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

const stats = [
  'str',
  'agi',
  'dex',
  'vit',
  'int',
  'luk',
]

function handler (bot, msg, match) {
  const player = playerFromId(msg.from.id)
  var statName
  player.isRegistered()
    .then(() => {
      try {
        statName = match[1].split(' ')[0]
      } catch (e) {
        throw new Error(e)
      }

      if (stats.indexOf(statName.toLowerCase()) === -1) {
        throw new Error('Invalid Stat')
      }

    })
    .then(() => {
      return player.improve(statName.toLowerCase(), 2)
    })
    .then(() => {
      bot.sendMessage(msg.chat.id, view.message(statName))
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error)
    })
}

module.exports = {
  message: new RegExp(emoji.emojify(':arrow_up_small: (.*)')),
  handler,
}

function checkStatName (statName) {
  if (!statName) {
    throw new Error('Invalid stat name')
  }
}
