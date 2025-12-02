declare module "*.mdx" {
  import * as React from "react";
  const MDXComponent: React.ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
