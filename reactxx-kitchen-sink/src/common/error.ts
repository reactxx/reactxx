type RootKeys = 'name'
type Root = { [P in RootKeys]?: number } & { subRoot?: Root }

const root: Root = {
  subRoot: {
    name: 2,
    x3: 2, // ===> SHOULD BE ERROR BUT NO ERROR
  }
}

const root2: Root = {
  subRoot: {
    //x3: 2,  // ==> ERROR AS EXPECTED (Type ... has no properties in common with type ...)
  }
}
