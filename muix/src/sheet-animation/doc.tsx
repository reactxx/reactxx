import React from 'react'

const sheet = {
    root: {
        opacity: 0.5,
        $transition: {
            $groupName: 'root', // allow grouping of $transitions for more elements (the same $duration, the same Animation.Value for native etc.)
            opacity: '-50', // '-50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'
            transform: true
        },
        $sheetFlags: {
            active: {
                opacity: 1,
            }
        }
    },
    label: {
        opacity: 1,
        $transitions: {
            $groupName: 'root',
            opacity: true,
        },
        $sheetFlags: {
            active: {
                opacity: 0,
            }
        }
    },
    text: {
        $web: {
            opacity: 0,
            $transition: {
                $duration: 400,
                $easing: '',
                opacity: true, 
            },
            ':hover': {
                opacity: 1,
            }
        },
    }
}