/*

   This file came from
   https://github.com/voodoocreation/ts-deepmerge/blob/master/src/index.ts
   The author unfortunately didn't include a proper copyright header
   or license, but they did list it on NPM under the ISC license here:
   https://www.npmjs.com/package/ts-deepmerge

   I'm including the source here rather than use the NPM package,
   because the packaged version doesn't include the source which
   throws off webpack trying to generate source maps

 */

interface IObject {
  [key: string]: any;
}

type TUnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// istanbul ignore next
const isObject = (obj: any) => {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }

    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  return false;
};

const merge = <T extends IObject[]>(
  ...objects: T
): TUnionToIntersection<T[number]> =>
  objects.reduce((result, current) => {
    if (Array.isArray(current)) {
      throw new TypeError(
        "Arguments provided to ts-deepmerge must be objects, not arrays."
      );
    }

    Object.keys(current).forEach((key) => {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return;
      }

      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays
          ? Array.from(new Set((result[key] as unknown[]).concat(current[key])))
          : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key] as IObject, current[key] as IObject);
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {}) as any;

interface IOptions {
  mergeArrays: boolean;
}

const defaultOptions: IOptions = {
  mergeArrays: true,
};

merge.options = defaultOptions;

merge.withOptions = <T extends IObject[]>(
  options: Partial<IOptions>,
  ...objects: T
) => {
  merge.options = {
    mergeArrays: true,
    ...options,
  };

  const result = merge(...objects);

  merge.options = defaultOptions;

  return result;
};

export default merge;
