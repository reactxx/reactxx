import React, { createContext, useState, useRef, useEffect } from 'react'

interface Context {
    url: string
    navigate?: (url: string) => void
}

class Router {
    
}
const Context = createContext<Context>({ url: window.location.pathname })           
const { Provider, Consumer } = Context

// https://medium.com/@george.norberg/history-api-getting-started-36bfc82ddefc
const RouterContainer: React.SFC = props => {
    const onPopState = useRef((ev: PopStateEvent) => {
        if (ev.state) {
//set new Route state
        } 
    })
    useEffect(() => {
        window.addEventListener('popstate', onPopState.current)
        return () => window.removeEventListener('popstate', onPopState.current)
    }, [])
    return null
}

// https://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome
// avoid onpopstate during page load
(function () {
    let blockPopstateEvent = document.readyState !== 'complete'
    window.addEventListener('load', () => 
        // The timeout ensures that popstate-events will be unblocked right
        // after the load event occured, but not in the same event-loop cycle.
        setTimeout(() => blockPopstateEvent = false, 0)
    , false)
    window.addEventListener('popstate', evt => {
        if (blockPopstateEvent && document.readyState === 'complete') {
            evt.preventDefault()
            evt.stopImmediatePropagation()
        }
    }, false)
})()