declare module 'html-react-parser' {
  import * as React from 'react';
  export default function parse(
    html: string,
    options?: any
  ): React.ReactNode;
}
