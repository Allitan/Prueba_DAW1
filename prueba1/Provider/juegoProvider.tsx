import { View, Text, Alert } from 'react-native';
import React, {useContext, useState, useEffect, ReactNode} from "react"
import { Carta } from '../Modelos/Carta';
import { Partida } from '../Modelos/Partida';
import { JuegoContext } from '../Context/juegoContext';

const valoresCartas = ['A', 'B', 'C', 'D'];

export default function JuegoProvider ({ children}: {children: ReactNode}){
    const [cartas, setCartas] = useState<Carta[]>([])
    const [juegoActivo, setJuegoActivo] = useState(false)
    const [cartasVolteadas, setCartasVolteadas] = useState<number[]>([]);
    const [partidasJugadas, setPartidasJugadas] = useState<Partida[]>([])
    const [juegoGanado, setJuegoGanado] = useState(false);

    const iniciarJuego = () => {
        const cartasIniciales: Carta[] = []
        let idCounter = 1;

        valoresCartas.forEach(valor => {
            cartasIniciales.push({id: idCounter++, valor, descubierta: false, encontrada: false});
            cartasIniciales.push({ id: idCounter++, valor, descubierta:false, encontrada: false});
        })

        for (let i = cartasIniciales.length -1; i> 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [cartasIniciales[i], cartasIniciales[j]] = [cartasIniciales[j], cartasIniciales[i]]
        }

        setCartas(cartasIniciales);
        setJuegoActivo(true);
        setCartasVolteadas([]);
        setJuegoGanado(false);
    }

    const registrarPartida = (resultado: 'Ganado' | 'Perdido') => {
        const nuevaPartida: Partida = {
            id: partidasJugadas.length +1,
            fecha: new Date().toLocaleDateString(),
            resultado
        }
        setPartidasJugadas(prevPartidas => [...prevPartidas, nuevaPartida])
    }

    const voltearCarta = (id: number) => {
        if (!juegoActivo || cartasVolteadas.includes(id) || cartas.find(c => c.id === id)?.encontrada) return;

        setCartas(prevCartas => prevCartas.map(carta =>
            carta.id === id ? {...carta, descubierta: true} : carta
        ));
        setCartasVolteadas(prevIds => [...prevIds, id]);
    };

    useEffect(() => {
        if (cartasVolteadas.length === 2) {
            const [id1, id2] = cartasVolteadas;
            const carta1 = cartas.find(c => c.id === id1);
            const carta2 = cartas.find(c => c.id === id2);

            if (!carta1 || !carta2) {
                setCartasVolteadas([]);
                return;
            }

            if (carta1.valor === carta2.valor) {
                setCartas(prevCartas => prevCartas.map(carta => 
                    carta.id === id1 || carta.id === id2 ? {...carta, encontrada: true, descubierta: true} : carta
                ));
                setCartasVolteadas([]);

                const todasEncontradas = cartas.filter(c => !c.encontrada).length === 2;
                if (todasEncontradas) {
                    Alert.alert("¡Has ganado el juego!");
                    registrarPartida("Ganado");
                    setJuegoGanado(true);
                    setJuegoActivo(false);
                }
            } else {
                setTimeout(() => {
                    setCartas(prevCartas => prevCartas.map(carta => 
                        carta.id === id1 || carta.id === id2 ? {...carta, descubierta: false} : carta
                    ));
                    setCartasVolteadas([]);
                    Alert.alert("¡Las cartas no son iguales!");
                    registrarPartida("Perdido");
                    setJuegoActivo(false);
                }, 1000);
            }
        }
    }, [cartasVolteadas, cartas, registrarPartida, setJuegoActivo, setJuegoGanado]);

    return (
        <JuegoContext.Provider value={{
            cartas,
            juegoActivo,
            juegoGanado,
            partidasJugadas,
            iniciarJuego,
            voltearCarta
        }}>
            {children}
        </JuegoContext.Provider>
    );
}

export const useJuego = () => {
    return useContext(JuegoContext);
};