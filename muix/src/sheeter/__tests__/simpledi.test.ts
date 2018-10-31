import SimpleDi from 'simpledi'
let di = new SimpleDi();

const Fela$Web = () => {
    return { Fela$Web: true }
}

const Sheeter$Web = () => {
    return { Sheeter$Web: true }
}

const Sheeter$Native = () => {
}

const Sheeter$Globals = () => {
    return { Sheeter$Globals: true }
}

di.register(Fela$Web.name, SimpleDi.once(Fela$Web))
di.register(Sheeter$Globals.name, SimpleDi.once(Sheeter$Globals))
di.register(Sheeter$Web.name, SimpleDi.once(Sheeter$Web), [Fela$Web.name, Sheeter$Globals.name])

let sheeter$Web = di.get(Sheeter$Web.name)
sheeter$Web = di.get(Sheeter$Web.name);

di = new SimpleDi()
di.register(Fela$Web.name, SimpleDi.once(Fela$Web))
di.register(Sheeter$Globals.name, SimpleDi.once(Sheeter$Globals))
di.register(Sheeter$Web.name, SimpleDi.once(Sheeter$Web), [Fela$Web.name, Sheeter$Globals.name])

sheeter$Web = di.get(Sheeter$Web.name);
sheeter$Web = null


