import { createContext } from "react";
import { Carta } from "../Modelos/Carta";
import { Partida } from "../Modelos/Partida";

interface JuegoContextType {
    cartas: Carta[];
    juegoActivo: boolean;
    juegoGanado: boolean;
    partidasJugadas: Partida[];
    iniciarJuego: () => void;
    voltearCarta: (id: number) => void;
}

export const JuegoContext = createContext<JuegoContextType>({
    cartas: [],
    juegoActivo: false,
    juegoGanado: false,
    partidasJugadas: [],
    iniciarJuego: () => {},
    voltearCarta: () => {}
});