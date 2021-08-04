export const fixUrl = (url: string) => {
  // ! http://mfc-d.com/api/v1/mfc
  // ! https://api.mfc-d.com/api/v1/mfc
  // * https://mfc-d.com/api/v1/mfc
  return url;
};

const isValidObject = (value: any) => {
  if (!value) {
      return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
  const isObject =
      Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (value: any, path: any[] = []): any => {
  if (isValidObject(value)) {
    return Object.assign({}, ...Object.keys(value).map((key) => flattenObject(value[key], path.concat([key]))));
  } else {
    return path.length ? { [`${path[0]}[${path[1]}]`]: value } : value;
  }
};
