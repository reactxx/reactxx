import { adjustRulesetCompiled } from '../sheeter/linearize-compile'
import { TSheeter } from '../sheeter/d-sheeter'

const merging: TSheeter.Ruleset<'root' | 'disabled'> = {
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
} as any

const whenUsed: TSheeter.Ruleset<'root' | 'disabled'> = {
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
} as any

const whenUsedRecursion: TSheeter.Ruleset<'root' | 'disabled'> = {
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
} as any



export const run = () => {
    const res = {
        MERGING: {
            source: merging,
            result: adjustRulesetCompiled(merging, 'merging')
        },
        WHEN_USED: {
            source: whenUsed,
            result: adjustRulesetCompiled(whenUsed, 'whenUsed')
        },
        WHEN_USED_RECURSION: {
            source: whenUsedRecursion,
            result: adjustRulesetCompiled(whenUsedRecursion, 'whenUsedRecursion')
        },
    }
    const json = JSON.stringify(res, null, 2)
    debugger
}

