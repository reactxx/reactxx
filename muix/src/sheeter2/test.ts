import { compile } from './compiler2'
import { TSheeterSource, TSheeterCompiled } from './types'

const merging: TSheeterSource.RulesTreeRoot<'root' | 'disabled'> = {
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

const whenUsed: TSheeterSource.RulesTreeRoot<'root' | 'disabled'> = {
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

const whenUsedRecursion: TSheeterSource.RulesTreeRoot<'root' | 'disabled'> = {
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
    let res
    //res = JSON.stringify(compile(merging, 'root'), null, 2)
    //res = JSON.stringify(compile(whenUsed, 'root'), null, 2)
    res = JSON.stringify(compile(whenUsedRecursion, 'root'), null, 2)
    debugger
}

