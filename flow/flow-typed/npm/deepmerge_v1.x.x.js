// flow-typed signature: d70a23e7087a5be3f0a2d358e8185f0b
// flow-typed version: 498f273a60/deepmerge_v1.x.x/flow_>=v0.25.x

type DeepMergeOptionsType = {
  arrayMerge?: (dest: Array<*>, source: Array<*>, options?: DeepMergeOptionsType) => Array<*>,
  clone?: boolean,
};

type DeepMergeObjects = {
  (a: Object, b: Object, options?: DeepMergeOptionsType): Object;
  all: (objects: Array<Object>, options?: DeepMergeOptionsType) => Object,
};

type DeepMergeArrays = {
  (a: Array<*>, b: Array<*>, options?: DeepMergeOptionsType): Array<*>;
  all: (objects: Array<Array<*>>, options?: DeepMergeOptionsType) => Array<*>,
};

declare module 'deepmerge' {
  declare module.exports: DeepMergeObjects & DeepMergeArrays;
}
