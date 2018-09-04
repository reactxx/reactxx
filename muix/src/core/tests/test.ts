import { compileRuleset } from '../compiler'
import { TSheeterSource, TSheeterCompiled } from '../types'

const merging: TSheeterSource.Ruleset<'root' | 'disabled'> = {
    $before: {
        before: 'before',
        self: 'before',
        web: 'before',
        after: 'before',
    },
    self: 'self',
    web: 'self',
    after: 'self',
    $web: {
        web: 'web',
        after: 'web',
    },
    $after: {
        after: 'after',
    },
}

const whenUsed: TSheeterSource.Ruleset<'root' | 'disabled'> = {
    $whenUsed: {
        root: {
            plain: 'plain',
        }
    },
    ':hover': {
        $whenUsed: {
            root: {
                hover: 'hover',
            }
        },
    }
}

const whenUsedRecursion: TSheeterSource.Ruleset<'root' | 'disabled'> = {
    rule: 'rule',
    $whenUsed: {
        root: {
            plainRoot: 'plainRoot',
            $whenUsed: {
                disabled: {
                    plainInner: 'plainInner',
                    ':hover': {
                        plainInnerHover: 'plainInnerHover',
                        ':active': {
                            plainInnerHoverActive: 'plainInnerHoverActive',
                        }
                    }
                }
            },
        }
    },
    ':hover': {
        hover: 'hover',
        $whenUsed: {
            root: {
                hoverRoot: 'hoverRoot',
                $whenUsed: {
                    disabled: {
                        hoverRootInner: 'hoverRootInner',
                    }
                },
                ':active': {
                    hoverRootActive: 'hoverRootActive',
                    $whenUsed: {
                        disabled: {
                            hoverRootActiveInner: 'hoverRootActiveInner',
                        }
                    },
                },
            }
        },
    }
}



export const run = () => {
    const res = {
        MERGING: {
            source: merging,
            result: compileRuleset(merging, 'merging')
        },
        WHEN_USED: {
            source: whenUsed,
            result: compileRuleset(whenUsed, 'whenUsed')
        },
        WHEN_USED_RECURSION: {
            source: whenUsedRecursion,
            result: compileRuleset(whenUsedRecursion, 'whenUsedRecursion')
        },
    }
    const json = JSON.stringify(res, null, 2)
    debugger
}

