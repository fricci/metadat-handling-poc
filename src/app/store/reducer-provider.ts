import { InjectionToken } from '@angular/core';

export interface SliceConfig {
    [action: string]: (state: any, action: any) => any
}

export interface Slices {
    [slice: string]: SliceConfig;
}

export const REDUCER_TOKEN = new InjectionToken<Slices>('REDUCER_TOKEN');

export function registerSlice(slice: Slices) {
    return { provide: REDUCER_TOKEN, useValue: slice, multi: true }
}