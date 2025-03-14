
declare module "node-turbo" {
  import stream from "node:stream";

  type TurboStreamAttributes = {
    action: string;
    target: string;
  }
  
  class TurboStream {
    action: string;
    target: string;

    constructor();
    constructor(attributes: TurboStreamAttributes, content: string);

    render(): string;
    createReadableStream(
      opts?: Record<string, string>, 
      streamOptions?: Record<string, string>
    ): stream.Readable;

    append(targetsOrAttributes: string | Record<string, string>, content: string): this; 
    appendAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    prepend(targetsOrAttributes: string | Record<string, string>, content: string): this; 
    prependAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    replace(targetsOrAttributes: string | Record<string, string>, content: string): this;
    replaceAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    update(targetsOrAttributes: string | Record<string, string>, content: string): this;
    updateAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    remove(targetsOrAttributes: string | Record<string, string>): this;
    removeAll(targetsOrAttributes: string | Record<string, string>): this;
    before(targetsOrAttributes: string | Record<string, string>, content: string): this;
    beforeAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    after(targetsOrAttributes: string | Record<string, string>, content: string): this;
    afterAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    /** 
     * @deprecated 
     * Deprecated since v1.2.0! Use update() or replace() with attribute { method: 'morph' } instead.
    */
    morph(targetsOrAttributes: string | Record<string, string>, content: string): this;
    /** 
     * @deprecated 
     * Deprecated since v1.2.0! Use update() or replace() with attribute { method: 'morph' } instead.
    */
    morphAll(targetsOrAttributes: string | Record<string, string>, content: string): this;
    refresh(targetsOrAttributes: string | Record<string, string>, content: string): this;
  }

  export {
    TurboStream,
  }
}

declare module "node-turbo/sse" {
  import { TurboStream } from "node-turbo";

  class SseTurboStream extends TurboStream {
    constructor(message: string);

    flush(): void;
  }

  export {
    SseTurboStream
  }
}

