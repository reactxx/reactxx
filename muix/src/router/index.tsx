import React, { createContext, useState, useEffect } from 'react'

interface Context {
    url: string
    navigate?: (url: string) => void
}

interface ProviderProps {

}

const Context = createContext<Context>({ url: window.location.pathname })
const { Provider, Consumer } = Context;

const RouterContainer: React.SFC = props => {
    return null
    const { } = useEffect(() => {
        window.onpopstate = function (event) {
            alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
        }
    }, [])
}