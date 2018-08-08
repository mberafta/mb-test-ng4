import { ListenerCallback } from './IRedux';
export interface Action {
    type: string, // Identifie l'action
    payload?: any
}

export interface Reducer<T> {
    (state: T, action: Action): T;
}

export interface ListenerCallback {
    (): void;
}

interface UnsubscribeCallback {
    (): void;
}

export class Store<T>{
    private _state: T;
    private _listeners: ListenerCallback[] = [];

    constructor(public reducer: Reducer<T>, initialState: T) {
        this._state = initialState;
    }

    getState(): T {
        return this._state;
    }

    setState(stateValue: T) {
        this._state = stateValue;
    }

    dispatch(action: Action): void {
        let state = this.getState();
        state = this.reducer(state, action);
        this.setState(state);
        this._listeners.forEach((listener:ListenerCallback) => listener());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        }
    }

}