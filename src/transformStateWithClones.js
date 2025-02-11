'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrStates = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        for (const key in obj.keysToRemove) {
          delete stateCopy[obj.keysToRemove[key]];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${obj.type}`);
    }

    arrStates.push({ ...stateCopy });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
