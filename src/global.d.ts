declare module "*.wasm" {
  const value: any;
  export default value;
}

declare namespace React {
  interface HTMLAttributes<T> {
    // Support using "class" instead of "className"
    class?: string;
  }
}
