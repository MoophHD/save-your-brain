export function chance(max) {
  return ~~(Math.random() * max );
}

export function objectChance(obj) {
  return obj[Object.keys(obj)[chance(Object.keys(obj).length)]];
}

export function arrayChance(array) {
  return array[chance(array.length)];
}