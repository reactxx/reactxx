declare module 'simpledi' {
  export default class SimpleDi {
    register(name: string, factory: Factory, dependencies?: string[], overwrite?: boolean): void
    registerBulk(dependencies: Register[]): void
    get(name: string, ...pars)
    getResolvedDependencyCount(): Record<string, number>

    public static always(obj): Factory
    public static withNew(constr: Object): Factory
    public static withNewOnce(constr: Object): Factory
    public static once(factory: Factory): Factory
  }

  export type Factory = (...args) => any

  export interface Register {
    name: string
    factory: Factory
    dependencies?: string[]
    overwrite?: boolean
  }
}