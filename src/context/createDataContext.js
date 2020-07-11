import React, { useReducer } from "react";

export default (reducer, actions, initialState) => { // Context automation
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        // actions === { addBlogPost: (dispatch) => { return() => {} } } ( for every key call that function with dispatch which returns a functions that gets passed down as value prop )
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>

    };
    return { Context, Provider };

};