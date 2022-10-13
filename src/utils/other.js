import Strings from "../constants/Strings";


export function getRoleType(id) {
  var _type =
    id === 2
      ? 'PARENTS_TO_BE'
      : id === 3
      ? 'SURROGATE_MOTHER'
      : id === 4
      ? 'EGG_DONER'
      : id === 5
      ? 'SPERM_DONER'
      : '';
  return _type;
}
