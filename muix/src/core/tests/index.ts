import { atomizeRuleset } from '../sheeter/atomize'
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

const whenFlag: TSheeter.Ruleset<'root' | 'disabled'> = {
    $whenFlag: {
        root: {
            plain: 'plain',
        }
    },
    ':hover': {
        $whenFlag: {
            root: {
                hover: 'hover',
            }
        },
    }
} as any

const whenFlagRecursion: TSheeter.Ruleset<'root' | 'disabled'> = {
    rule: 'rule',
    $whenFlag: {
        root: {
            plainRoot: 'plainRoot',
            $whenFlag: {
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
        $whenFlag: {
            root: {
                hoverRoot: 'hoverRoot',
                $whenFlag: {
                    disabled: {
                        hoverRootInner: 'hoverRootInner',
                    }
                },
                ':active': {
                    hoverRootActive: 'hoverRootActive',
                    $whenFlag: {
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
            result: atomizeRuleset(merging, 'merging')
        },
        WHEN_USED: {
            source: whenFlag,
            result: atomizeRuleset(whenFlag, 'whenFlag')
        },
        WHEN_USED_RECURSION: {
            source: whenFlagRecursion,
            result: atomizeRuleset(whenFlagRecursion, 'whenFlagRecursion')
        },
    }
    const json = JSON.stringify(res, null, 2)
    debugger
}

