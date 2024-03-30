import { type ReactNode, createContext, useContext, useReducer } from "react";


//3. typ timer

export type Timer = {
    name:string,
    duration:number
}

// 2.Timer State for context
type TimerState = {
    //data to be manipulated  by the methods
    isRunning:boolean,
    timers:Timer[]
}

//initial state for use reducer hook
// 11the step
const initialState:TimerState={
    isRunning:true,
    timers:[]
}


// 4. type ContextValue
type TimersContextValue = TimerState &{
    //methods to call from anywhre
    addTimer:(timeData:Timer)=>void,
    startTimers:()=>void,
    stopTimers:()=>void;
};
//1st step
export const TimersContext = createContext<TimersContextValue | null>(null);


//8th step 
export function useTimersContext(){
    //use context simply add checking condition and return that Ctx
    const timerCtx = useContext(TimersContext);
    if (timerCtx==null) {
        throw new Error('Thats not possible!!!');
    }
    return timerCtx;
}



//6.the step  type for TimerContextValue 
type TimerContextProviderProps = {
    children:ReactNode
}  

// Action Props will be of type literal
// action is message we are sending with dispatch



// 13 the step Right way

type StartTimersAction = {
    type:'START_TIMERS'
}


type StopTimersAction = {
    type:'STOP_TIMERS'
}


type AddTimersAction = {
    type:'ADD_TIMER';
    payload:Timer // to create object
}








//Wrong wayy
type Action = StartTimersAction | StopTimersAction | AddTimersAction;







// reducer 
//12 the step it recive two parameteres

function timersReducer(state:TimerState,action:Action){ //handle action and change state  appropriatly

    if (action.type==='START_TIMERS') {
        return {
            ...state,
            isRunning:true
        }
    }
    if (action.type==='STOP_TIMERS') {
        return {
            ...state,
            isRunning:false
        }
    }
    if (action.type==='ADD_TIMER') {
        return {
            ...state,
            timers :[
                ...state.timers,
                {
                    name:action.payload.name,
                    duration:action.payload.duration
                }
            ]
        }
    }
    return state;



}






//5.step 

export default function TimersContextProvider({children}:TimerContextProviderProps){
    
    //useReducer Hook 10the step
    const [timerState,dispatch] = useReducer(timersReducer, initialState);



    
    //centralised data

    const ctx:TimersContextValue = {
        timers:timerState.timers,
        isRunning:timerState.isRunning,
        addTimer(timerData){
            dispatch({type:'ADD_TIMER', payload:timerData});
        },
        startTimers() {
            dispatch({type:'START_TIMERS'});
            
        },
        stopTimers() {
            dispatch({type:'STOP_TIMERS'});
            
        },

    }
    return(
        // context object.Provider 
        <TimersContext.Provider value={ctx} >{children}</TimersContext.Provider>
    )
};