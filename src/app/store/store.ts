import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Observable, BehaviorSubject } from 'rxjs';

export function registerReducer(actionType: string, reducer: (state: any,action: any) => any) {
    registeredReducers.set(actionType, reducer);
}

const registeredReducers = new Map<string, (state: any,action: any) => any>();

function rootReducer(state={}, action) {
    if(registeredReducers.has(action.type)) {
        return registeredReducers.get(action.type)(state, action);
    } else {
        console.warn('No registered reducer for action ', action);
    }
    return state;
}

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));

export const state$ = new BehaviorSubject<{}>(store.getState());  

store.subscribe(() => {
    state$.next(store.getState());
})

export default store;
