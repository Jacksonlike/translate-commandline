const { spawn } = require('child_process');
const findExec = require('find-exec');

const playSound = (uri) => {
  if (!findExec('mplayer')) {
    console.log('Please install `mplayer` first !');
    return;
  }

  spawn('mplayer', [uri]);
};

module.exports = playSound;
