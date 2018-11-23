import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-sheeter'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$web'
import { setActWidth } from './conditions/$widths/store'

export const init = () => {
    Fela.initFela$Web(platform)

    platform._sheeter.widthDirs = new Set()

    assignPlatform({
        actWidth: () => window.innerWidth || 0,

        addBreakpoint: (width: number) => {
            const { _sheeter: { widthDirs } } = platform
            if (!width || widthDirs.has(width)) return
            widthDirs.add(width)
            const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
            mediaQuery.addListener(onWidthChanged)
        },

        toPlatformAtomizeRuleset: platform.renderer.renderRuleEx,
        dataTrace: Fela.dataTrace,
        applyLastwinsStrategy,
        finalizeClassName,
        createElement
    })
}

const onWidthChanged = () => {
    const { _sheeter } = platform
    if (_sheeter.widthsTimer) return
    _sheeter.widthsTimer = window.setTimeout(() => {
        _sheeter.widthsTimer = 0
        setActWidth(window.innerWidth)
    }, 1)
}
