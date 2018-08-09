export interface IAction {
    type: String,
    payload: any
}

export interface IReducer<T> {
    (action: IAction, state: T): T // N'importe quelle méthode prenant une action et un état du type T en paramètres
}

export interface IListener<T> {
    name: String,
    notify(value: any): void;
    unsubscribe(): void
}

export interface ICallback {
    (): void
}

export class Store<T>{
    public state: T;
    public listeners: IListener<T>[] = [];

    constructor(private reducer: IReducer<T>, firstState: T) {
        this.state = firstState;
    }

    dispatch(action: IAction) {
        this.state = this.reducer(action, this.state);
        this.listeners.forEach((l) => {
            l.notify(this.state);
        });
    }

    subscribe(listener: IListener<T>) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: IListener<T>) {
        this.listeners = this.listeners.filter(l => l != listener);
    }
}

export class MessageActions{
    public static addMessage(message:string): IAddMessageAction{
        return {
            type:'ADD_MESSAGE',
            message:message,
            payload:null
        }
    }
    public static deleteMessage(index:number): IDeleteMessageAction{
        return{
            type:'DELETE_MESSAGE',
            index:index,
            payload:null
        }
    }
}

export interface IAppState {
    messages: String[];
}

export interface IAddMessageAction extends IAction {
    message: String;
}

export interface IDeleteMessageAction extends IAction {
    index: number;
}