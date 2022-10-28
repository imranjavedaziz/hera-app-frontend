export function getRoleType(id) {
  if (id === 2) {
    return 'PARENTS_TO_BE';
  }
  if (id === 3) {
    return 'SURROGATE_MOTHER';
  }
  if (id === 4) {
    return 'EGG_DONER';
  }
  if (id === 5) {
    return 'SPERM_DONER';
  } else {
    return '';
  }
}
