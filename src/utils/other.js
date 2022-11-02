export function getRoleType(id) {
  if (id === 2) {
    return 'Parent To Be';
  }
  if (id === 3) {
    return 'Surrogate Mother';
  }
  if (id === 4) {
    return 'Egg Doner';
  }
  if (id === 5) {
    return 'Sperm Doner';
  } else {
    return '';
  }
}
