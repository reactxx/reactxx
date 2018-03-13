declare namespace KSink {

  const enum Consts {
    navigationName = 'navigation',
  }

  interface Example {
    name: string
    title: string
    ignoreInNavigation?: boolean
    Component: React.ComponentType
    descr?: string
  }

}