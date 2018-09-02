declare namespace KSink {

  interface Example {
    name: string
    title: string
    ignoreInNavigation?: boolean
    Component: React.ComponentType
    descr?: string
  }

}