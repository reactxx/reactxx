import React from 'react'

const sheet = {
    root: {
        opacity: 0,
        $transitions: {
            t$root: {
                $duration: 400, // chybi-li, bere se z globalniho default
                $easing: '',
                opacity: '-50', // '' or '-50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'
                transform: ''
            }
        },
        $sheetFlags: {
            active: {
                opacity: 1,
            }
        }
    },
    label: {
        opacity: 0,
        $transitions: {
            t$root: {
                opacity: '50-'
            }
        },
        $sheetFlags: {
            active: {
                opacity: 1,
            }
        }
    },
    text: {
        $web: {
            opacity: 0,
            $transition: {
                $duration: 400, // chybi-li, bere se z globalni default
                $easing: '',
                opacity: '', // jako $transitions
            },
            ':hover': {
                opacity: 1,
            }
        },
    }
}