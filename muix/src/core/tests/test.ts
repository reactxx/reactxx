import { TSheeter } from 'reactxx-typings'

import { atomizeRuleset } from 'reactxx-sheeter'

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
    $sheetFlags: {
        root: {
            plain: 'plain',
        }
    },
    ':hover': {
        $sheetFlags: {
            root: {
                hover: 'hover',
            }
        },
    }
} as any

const whenFlagRecursion: TSheeter.Ruleset<'root' | 'disabled'> = {
    rule: 'rule',
    $sheetFlags: {
        root: {
            plainRoot: 'plainRoot',
            $sheetFlags: {
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
        $sheetFlags: {
            root: {
                hoverRoot: 'hoverRoot',
                $sheetFlags: {
                    disabled: {
                        hoverRootInner: 'hoverRootInner',
                    }
                },
                ':active': {
                    hoverRootActive: 'hoverRootActive',
                    $sheetFlags: {
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

