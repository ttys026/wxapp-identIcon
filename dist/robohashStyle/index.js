var svg_json = require('./svg.js');
var HashTool = require('./hash.js').sha256;

function base64_encode(str) {
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var i = 0, len = str.length, string = '';

  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
      string += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
      string += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    string += base64EncodeChars.charAt(c1 >> 2);
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    string += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return string
}

class Robohash {

  /* Public API */

  static svg(text) {
    const hash = this._hash(HashTool(text));
    return this._svgTemplate(this.colors[hash[0]], this.bgColors[hash[1]], hash[2], hash[3], hash[4], hash[5], hash[6]);
  }

  // static render(text, $element) {
  //   $element.innerHTML = this.svg(text)
  // }

  static toDataUrl(text) {
    return `data:image/svg+xml;base64,${base64_encode(this.svg(text))}`;
  }


  /* Private API */
  static _svgTemplate(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
    return this._$svg(this._$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr));
  }

  static _clippedsvgTemplate(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
    return this._$svg(this._$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr));
  }

  static _$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
    return `
            <g style="color:${color}">
                <rect fill="${backgroundColor}" x="0" y="0" width="320" height="320"></rect>
                ${this._$use('body', bodyNr)}
                ${this._$use('face', faceNr)}
                ${this._$use('eyes', eyesNr)}
                ${this._$use('mouth', mouthNr)}
                ${this._$use('accessory', accessoryNr)}
            </g>`
  }

  static _$svg(content) {
    return `
            <svg viewBox="0 0 320 320" width="320" height="320" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
                ${content}
            </svg>`
  }

  static _$use(part, index) {
    var temp = part + '-' + this._assetIndex(index);
    return svg_json[temp];
  }

  static get colors() {
    return [
      '#ff9800', // orange-500
      '#E53935', // red-600
      '#FDD835', // yellow-600
      '#3f51b5', // indigo-500
      '#03a9f4', // light-blue-500
      '#9c27b0', // purple-500
      '#009688', // teal-500
      '#EC407A', // pink-400
      '#8bc34a', // light-green-500
      '#795548' // brown-500
    ]
  }

  static get bgColors() {
    return [
      /* Red  */
      '#FF8A80', // red-a100
      '#F48FB1', // pink-200
      '#ea80fc', // purple-a100

      /* Blue */
      '#8c9eff', // indigo-a100
      '#80d8ff', // light-blue-a100
      '#CFD8DC', // blue-grey-100

      /* Green */
      '#1DE9B6', // teal-a400
      '#00C853', // green-a-700

      /* Orange */
      '#FF9E80', // deep-orange-a100
      '#FFE57F' // amber-a100
    ]
  }

  static _assetIndex(index) { index = Number(index) + 1; return index < 10 ? '0' + index : index }

  static _hash(text) {
    return ('' + text
      .split('')
      .map(c => Number(c.charCodeAt(0)) + 3)
      .reduce((a, e) => a * (1 - a) * this.__chaosHash(e), 0.5))
      .split('')
      .reduce((a, e) => e + a, '')
      .substr(4, 10);
  }

  static __chaosHash(number) {
    const k = 3.569956786876;
    let a_n = 1 / number;
    for (let i = 0; i < 100; i++) {
      a_n = (1 - a_n) * a_n * k;
    }
    return a_n;
  }
}

module.exports = Robohash;