export function getRoleType(id) {
  if (id === 2) {
    return 'Intended Parent';
  }
  if (id === 3) {
    return 'Storks (Surrogate)';
  }
  if (id === 4) {
    return 'Eggs (Egg donor)';
  }
  if (id === 5) {
    return 'Fertilizers (Sperm donor)';
  } else {
    return '';
  }
}
