/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  const upper = str.toLocaleUpperCase();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (upper[i] === alphabet[j]) {
        if (parseInt(j, 10) + parseInt(n, 10) >= 32) {
          result += alphabet[parseInt(j, 10) + parseInt(n, 10) - 32];
        } else {
          result += alphabet[parseInt(j, 10) + parseInt(n, 10)];
        }
      }
    }
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  const upper = str.toLocaleUpperCase();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (upper[i] === alphabet[j]) {
        if (parseInt(j, 10) - parseInt(n, 10) < 0) {
          result += alphabet[parseInt(j, 10) - parseInt(n, 10) + 32];
        } else {
          result += alphabet[parseInt(j, 10) - parseInt(n, 10)];
        }
      }
    }
  }
  return result;
}

function adjustAlphabet(el) {
  alphabet = el.target.value;
}

function calculateString(el) {
  if (document.querySelector('input[name="type"]:checked').value === 'encode') {
    document.querySelector('.result').innerHTML = encode(el.target.value, document.querySelector('.shiftValue').innerHTML, alphabet.value);
  } else {
    document.querySelector('.result').innerHTML = decode(el.target.value, document.querySelector('.shiftValue').innerHTML, alphabet.value);
  }
}

function swapType(el) {
  type = el.target.value;
}

function adjustRange(el) {
  shift = el.target.value;
  document.querySelector('.shiftValue').innerHTML = `${el.target.value}`;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function init(el) {
    // Setja event handlera á viðeigandi element
    const range = document.querySelector('input[type=range]');
    range.addEventListener('change', adjustRange);

    const radios = document.querySelectorAll('input[type=radio]');
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', swapType);
      radios[i].addEventListener('change', calculateString);
    }
    const alphab = document.querySelector('#alphabet');
    alphab.addEventListener('keyup', adjustAlphabet);
    alphab.addEventListener('keyup', calculateString);
    const input = document.querySelector('#input');
    input.addEventListener('input', calculateString);
    range.addEventListener('change', calculateString);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
