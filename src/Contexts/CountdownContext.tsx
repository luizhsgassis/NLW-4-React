import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);  //* 25 vezes 60 segundos é equivalente a 25 minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);      //* os minutos são o tempo dividido pelos segundos e esse resultado é arredondado sempre para baixo
    const seconds = time % 60;                  //* os segundos são o resto do tempo por exemplo: 24:58 / 60(minuto) = 58(que é o resto em segundos)

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        sethasFinished(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {          //* se o active for true ou o time mudar e o time for maior que 0 algo acontece depois de um tempo(setTimeout)
                setTime(time - 1);      //* o tempo é reduzido em 1 segundo
            }, 1000)                    //* se o active for false então a contagem para
        }   else if ( isActive && time == 0 ){
            sethasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);


    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds, 
            hasFinished,
            isActive,
            startCountdown, 
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}