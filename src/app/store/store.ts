import { Inject, Injectable } from '@angular/core';
import { applyMiddleware, configureStore, createSlice, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BehaviorSubject } from 'rxjs';
import { ViewMetadata } from './model/view-metadata.model';
import { REDUCER_TOKEN, Slices } from './reducer-provider';

export interface Store {
    parameters: {
        [id: string]: any;
    };
    metadata: {
        [id: string]: ViewMetadata<any, any>
    }
}

@Injectable({
    providedIn: 'root'
})
export class PhxStore {

    private readonly store = null
    public readonly state$ = null

    constructor(@Inject(REDUCER_TOKEN) public injectedSliceConfigs: Slices[]) {
        const combinedSlices = this.combineSlicesAcrossModules(injectedSliceConfigs)

        const reducers: any = {};
        Object.keys(combinedSlices).forEach((sliceName) => {
            const sliceConfig = combinedSlices[sliceName];
            const slices = createSlice({
                name: sliceName,
                initialState: {},
                reducers: {},
                extraReducers: (builder) => {
                    sliceConfig.forEach(reducerActionPair => {
                        builder.addCase(reducerActionPair.action, reducerActionPair.reducer);
                    });
                    builder.addDefaultCase((state, action) => {
                        console.error('No handler for this action: ', action);
                        return state;
                    })
                }
            }).reducer;
            reducers[sliceName] = slices;
        })

        this.store = configureStore({
            reducer: reducers
        });

        this.state$ = new BehaviorSubject<Store>(this.store.getState());

        this.store.subscribe(() => {
            this.state$.next(this.store.getState());
        })
    }

    private combineSlicesAcrossModules(injectedSliceConfigs: Slices[]): Slices {
        const combinedSlices = {};
        injectedSliceConfigs.forEach(injectedSliceConfig => {
            Object.keys(injectedSliceConfig).forEach((sliceNameInConfig) => {
                if (!combinedSlices[sliceNameInConfig]) {
                    combinedSlices[sliceNameInConfig] = [];
                }
                combinedSlices[sliceNameInConfig] = [
                    ...combinedSlices[sliceNameInConfig],
                    ...injectedSliceConfig[sliceNameInConfig]
                ];
            })
        })
        return combinedSlices;
    }

    dispatch(action: any) {
        this.store.dispatch(action);
    }

    getState(): Store {
        return this.store.getState();
    }


}
