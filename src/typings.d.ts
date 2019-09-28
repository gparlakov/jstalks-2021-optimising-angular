/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface System {
  import(module: string): Promise<any>;
}
declare var System: System;
