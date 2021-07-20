import { useContext } from 'react';
import { CountdownContext } from '../Contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');     //* padStart( se não tiver 2 caracteres como 25 e tiver apenas 1 como 5 ele preenche com 0 ficando 05) split( divide em 2 variáveis como 25 -> '2' '5')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                    >
                    Ciclo encerrado
            </button>
            ) : (
                <>
                { isActive ? (
                    <button 
                        type="button"
                        className={`${styles.countdownButtonActive} ${styles.countdownButton}`}
                        onClick={resetCountdown}
                        >
                        Abandonar ciclo
                    </button>
                    ) : (
                    <button 
                        type="button"
                        className={styles.countdownButton}
                        onClick={startCountdown}
                        >
                        Iniciar um ciclo
                    </button>
                    ) }
                </>
            )}
        </div>
    );
}