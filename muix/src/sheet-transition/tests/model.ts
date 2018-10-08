import ReactN from 'react-native';
import { TCommonStyles } from 'reactxx-typings';

export type NativeAnimationRuleset = InterpolationConfigTypes & { transform?: InterpolationConfigTypes }
export type InterpolationConfigTypes = { [ruleName: string]: InterpolationConfigType }
export type InterpolationConfigType = ReactN.Animated.InterpolationConfigType


const sheetTrasition = {
    transitionGroupNative: {
        PROPS: {
            leftDrawer: {
                duration: 300,
                initOpened: false,
            },
        },
        PIPE_DATA: {
            leftDrawer: { // OR NULL IF CURRENTLY NOT ANIMATED (animation finished etc.)
                lastOpened: false,
                //lastAnimationValue: {}, // Animated.Value
                lastAnimationHash: {
                    element1Id: '',
                    element2Id: '',
                },
                lastAnimationActualValue: 0.67,
            }
        },
        // ------- sheetQuery.$transitionGroup changed throw innerState
        SHEET_QUERY: { 
            $transitionGroup: {
                leftDrawer: {
                    opened: true,
                }
            }
        },
        $transitionGroup: {
            leftDrawer: {
                opacity: [0, 1, '5-'],
                transform: {
                    translateX: [-100, 0],
                    $interval: '200,100'
                }
            }
        },
        atomized: [
            {
                deffered: true,
                type: '$transitionGroup',
                name: 'leftDrawer',
                interpolate: {
                    opacity: { s: [], d: [] },
                    transform: {
                        translateX: { s: [], d: [] }
                    }
                },
                hashes: {
                    common: '',
                    opened: '',
                    closed: ''
                },
            }
        ],
        atomizeArray: undefined, // copy from atomized
        lastWinStrategy: {
            /*            
            last $transition or $transitionGroup wins
 
            adjust new global Animation.Value
            Object.Assing (style, interpolation(atomized.interpolate))
 
            if
              PIPE_DATA.leftDrawer
              PIPE_DATA.leftDrawer.lastOpened !== SHEET_QUERY.leftDrawer.opened
            then
              nextAnimationHash.element1Id = ''
            */
            setTimeout: {
                /*
                if 
                  PIPE_DATA.leftDrawer.lastAnimationHash===nextAnimationHash
                then
                  Animation.setValue(lastAnimationActualValue)
                  Animation.timer.toValue = SHEET_QUERY.leftDrawer.opened ? 0 : 1
                else
                  Animation.value = SHEET_QUERY.leftDrawer.opened ? 0 : 1
                */
            },
        },
    },
    transitionNative: {
        // ------- last situation
        ELEMENT_DATA: {
            lastOpened: false,
            //lastAnimationValue: {},
            lastAnimationHash: '',
            lastAnimationActualValue: 0.67,
        },
        // ------- sheetQuery.$switch changed throw innerState
        SHEET_QUERY: { // sheetQuery.$switch
            $switch: {
                active: true,
            }
        },

        $transition: {
            $duration: 300,
            $initOpened: false,
            opacity: [0, 1, '5-'],
            transform: {
                translateX: [-100, 0],
                $interval: '200,100'
            }
        },
        $switch: {
            active: {
                $transitionOpened: true
            }
        },
        // ------- 
        atomized: [
            {
                deffered: true,
                type: '$transition',
                opened: false,
                conditions: null,
                interpolate: {
                    opacity: { s: [], d: [] },
                    transform: {
                        translateX: { s: [], d: [] }
                    }
                },
                hashes: {
                    common: '',
                    opened: '',
                    closed: ''
                },
            },
            {
                deffered: true,  // last type wins
                type: '$transitionPointer',
                opened: true,
                conditions: ['switch: active'],
            }
        ],
        atomizeArray: undefined, // copy from atomized
        lastWinStrategy: {
            /*            
            last $transition or $transitionGroup wins
 
            new Animation.Value
            Object.Assing (style, interpolation(atomized.interpolate))
 
            if
              ELEMENT_DATA
              !!($transitionPointer && $transitionPointer.opened) !== !!ELEMENT_DATA.lastOpened
              ELEMENT_DATA.lastAnimationHash === newHash
            then
              Animation.setValue(lastAnimationActualValue)
              Animation.timer.toValue = $transitionPointer.opened ? 1 : 0
            else
              Animation.value = $transitionPointer.opened ? 1 : 0
            */
            setTimeout: {

            },
        },
    },
    transitionWeb: {
        $transition: {
            $duration: 300,
            $opened: false, // OPTION
            opacity: [0, 1, '5-'],
            transform: {
                translateX: [-100, 0],
                $interval: '200,100'
            }
        },
        $web: {
            ':hover': {
                $transitionOpened: true // <== copy classes for animation target here
                // $transition: false // OPTION
            }
        },
        atomized: [
            {
                deffered: true,
                type: '$transition',
                case: false,
                array: ['a', 'b', 'c'], // transition: 'opacity ..., transform: ...'; opacity: 0; transform: ''
                notCaseSource: { // source pro pointer.case === !case
                    opacity: 1,
                    transform: {
                        translateX: 0
                    }
                }
            },
            {
                deffered: true,
                type: '$transitionOpened',
                case: true,
                prefixes: [':hover'],
            }
        ],
        atomizeArray: undefined,
        lastWinStrategy: {
            array: ['a', 'b', 'c'],
            ':hover': {
                array: ['a', 'b', 'c'],
            }
        },
    },
    drawer: {
        $transitionGroup: {
            name: 'transRoot',
            $duration: 300,
            opacity: [0, 1, '5-'],
            transform: {
                translateX: [-100, 0]
            }
        },


        atomizedGroup: [{
            name: 'transRoot',
            opened: ['a', 'b', 'c'],
            closed: ['a', 'b', 'c'],
        }, {
            deffered: true,
            name: 'transRoot',
            $duration: 300,
        }],


        $web: {
            ':hower': {
                $transitionOpen: true
            }
        },
        $flags: {
            open: {
                $transitionOpen: true
            }
        }
    },
}

const queryGroup = {
    $transitionGroup: {
        'transRoot': true
    }
}

/*
NATIVE: deffered
 */
const native = {
    root: {
        $transition: {
            $duration: 300,
            props: ['opacity', 'transform'],
        },
        atomized: {
            $duration: 300,
            props: ['opacity', 'transform'],
        },
        $transitionGroup: {
            name: 'transRoot',
            $duration: 300,
            opacity: [0, 1],
            transform: {
                translateX: [-100, 0, '100,']
            }
        },
        atomizedGroup: {
            deffered: true,
            name: 'transRoot',
            $duration: 300,
            opacity: {
                inputRange: [],
                outputRange: []
            } as ReactN.Animated.InterpolationConfigType,
            transform: {
                translateX: {
                    inputRange: [],
                    outputRange: []
                } as ReactN.Animated.InterpolationConfigType
            }
        }
    },
    drawer: {
        //...
    }
}

// NATIVE: element info
const nativeElements = {
    animValues: {
        'transRoot': null,
    },
    items: [{
        key: 1,
        lastValue: {
            $duration: 300,
            opacity: 0,
            transform: {
                translateX: -100
            },
            hash: '300||opacity|@translateX'
        },
    }]
}

let notAnimArray, createAnimation, animatedValue, interpolatedStyles

const elementTimeline = [{
    status: {
    },
    input: {
        notAnimArray: [{}, {}, {}],
        $duration: 300,
        values: [
            { opacity: [1, 100, 50] }, // init value, leftGap, rightGap
            { '@translateX': [-100, 0, 0] },
        ],
        hash: '300||opacity|@translateX', //name|duration|easing|...sort(propsNames)
        valueHash: '0|1',
    },
    proc: {/*
        
    */}
}, {
    status: {
        atomicArray: [
            ...notAnimArray,
            { opacity: 1 },
            { '@translateX': -100 }
        ],
        animStatus: {
            target: [
                { opacity: 0 },
                { '@translateX': -100 }
            ],
            hash: '300||opacity|@translateX',
            targetHash: '0|-100',
        },
    },
    input: {
        notAnimArray: [{}, {}, {}],
        $duration: 300,
        values: [
            { opacity: 1 },
            { '@translateX': 0 },
        ],
        hash: '300||opacity|@translateX',
        valueHash: '1|0',
    },
    input2: {
        notAnimArray: [{}, {}, {}],
        hash: undefined,
        valueHash: undefined,
    },
    input3: {
        notAnimArray: [{}, {}, {}],
        name: 'transRoot',
        hash: 'transRoot|...',
        valueHash: '...',
        /*...*/
    },
    proc: {/*
        if (status.animStatus.hash !== input.hash) {
            if (animatedValue) cancel animation
        } else if (someAnimValuesChanged) {
            
        }
    */}
}, {
    status: {
        atomicArray: [
            ...notAnimArray,
            ...interpolatedStyles
        ],
        animStatus: {
            value: animatedValue,
            interpolations: createAnimation(animatedValue, { opacity: [0, 1], '@translateX': [-100, 0] }),
            targetValue: 1,
            source: [
                { opacity: 0 },
                { '@translateX': -100 }
            ],
            target: [
                { opacity: 1 },
                { '@translateX': 0 }
            ],
            hash: '300||opacity|@translateX',
            targetHash: '1|0',
            sourceHash: '0|-100',
        },
        input: {
            notAnimArray: [{}, {}, {}],
            $duration: 300,

            values: [
                { opacity: 0 },
                { '@translateX': -100 },
            ],
            hash: '300||opacity|@translateX',
            valueHash: '0|-100',
        },
        proc: {/*
            if (animatedValue && status.animStatus.hash === input.hash && animStatus.sourceHash===input.valueHast)
                animatedValue.toValue(animStatus.targetValue===0 ? 1 : 0 )
        */}
    }

}, {
    status: {
        atomicArray: [
            ...notAnimArray,
            ...interpolatedStyles
        ],
        animStatus: {
            value: animatedValue, // copy
            interpolations: interpolatedStyles, // copy
            targetValue: 0, // CHANGW
            source: [
                { opacity: 1 },
                { '@translateX': 0 }
            ],
            target: [
                { opacity: 0 },
                { '@translateX': -100 }
            ],
            hash: '300||opacity|@translateX',
            sourceHash: '1|0',
            targetHash: '0|-100',
        },
    }
}]

