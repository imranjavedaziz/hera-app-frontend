export function getRoleType(id) {
  if (id === 2) {
    return 'Intended Parent';
  }
  if (id === 3) {
    return 'Surrogate Mother';
  }
  if (id === 4) {
    return 'Egg Donor';
  }
  if (id === 5) {
    return 'Sperm Donor';
  } else {
    return '';
  }
}
