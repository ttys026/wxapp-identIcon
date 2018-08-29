var Identicon = require('./identicon.js');
var HashTool = require('./hash.js').sha256;

function getAvatar(hash, size){
  var options = {
    // foreground: [0, 0, 0, 255],
    background: [255, 255, 255, 255],
    margin: 0.2,                              // 20% margin
    size: 420,
    format: 'svg'
  };

  return "data:image/svg+xml;base64," + new Identicon(HashTool(hash), options).toString();
}

module.exports = getAvatar;
