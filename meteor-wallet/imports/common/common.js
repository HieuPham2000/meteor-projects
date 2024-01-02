// Unique id from the random package also used by minimongo
// min and max are used to set length boundaries
// set both for explicit lower and upper bounds
// set min as integer and max to null for explicit lower bound and arbitrary upper bound
// set none for arbitrary length
// set only min for fixed length
// character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88
// string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143
export const isValidBound = (value, lower) => !value || (Number.isSafeInteger(value) && value > lower);

export const idOfLength = (min, max) => {
  if (!isValidBound(min, 0)) throw new Error(`Expected a non-negative safe integer, got ${min}`);
  if (!isValidBound(max, min))
    throw new Error(`Expected a non-negative safe integer greater than 1 and greater than min, got ${max}`);
  let bounds;
  if (min && max) bounds = `${min},${max}`;
  else if (min && max === null) bounds = `${min},`;
  else if (min && !max) bounds = `${min}`;
  else if (!min && !max) bounds = '0,';
  else throw new Error(`Unexpected state for min (${min}) and max (${max})`);
  return new RegExp(`^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{${bounds}}$`);
};

export const ID_REGEX = idOfLength(17);

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;