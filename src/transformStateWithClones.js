'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrStates = [];
  let stateCopy = { ...state };

  for (const obj of actions) {
    let newState;

    switch (obj.type) {
      case 'addProperties':
        newState = Object.assign({}, stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        newState = { ...stateCopy };

        for (const key of obj.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${obj.type}`);
    }

    arrStates.push({ ...newState });
    stateCopy = newState;
  }

  return arrStates;
}

module.exports = transformStateWithClones;
