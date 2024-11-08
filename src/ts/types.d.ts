/**
 * @description Valid types for URL targets
 */
declare interface URLTargetTypeInterface {
  LIVE_DEMO: "data-live-demo-url";
  SOURCE: "data-source-code-url";
}

type URLTargetType = NonNullable<URLTargetTypeInterface[Required<keyof URLTargetTypeInterface>]>;

declare interface TargetShape {
  nodes: NodeListOf<Element>;
  target: URLTargetType;
}

/**
 * @see {@link https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript}
 */
declare type FixedLengthArray<T, Length extends number> = ReadonlyArray<T> & { length: Length };
declare type TargetsArray = FixedLengthArray<TargetShape, 2>;

declare type CorrespondanceMap = Map<TargetShape["nodes"], NonNullable<TargetShape["target"]>>;
export { CorrespondanceMap, TargetsArray, URLTargetType };
