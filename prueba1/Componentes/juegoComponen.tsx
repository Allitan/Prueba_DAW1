import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'
import { useJuego } from "../Provider/juegoProvider";

export default function JuegoComponent() {
    const { cartas, juegoActivo, iniciarJuego, voltearCarta, juegoGanado } = useJuego();

    return (
        <View style={styles.container}>
            {!juegoActivo ? (
                <Button title="Iniciar a jugar" onPress={iniciarJuego} />
            ) : (
                <>
                    <View style={styles.tablero}>
                        {cartas.map(carta => (
                            <TouchableOpacity
                                key={carta.id}
                                style={[
                                    styles.carta,
                                    (carta.descubierta || carta.encontrada) && styles.cartaDescubierta,
                                    carta.encontrada && styles.cartaEncontrada,
                                ]}
                                onPress={() => voltearCarta(carta.id)}
                                disabled={carta.descubierta || carta.encontrada}
                            >
                                <Text style={styles.textoCarta}>
                                    {(carta.descubierta || carta.encontrada) ? carta.valor : "?"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {juegoGanado && <Text style={styles.mensajeGanador}>¡Felicidades, has ganado!</Text>}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tablero: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
    },
    carta: {
        width: 60,
        height: 60,
        margin: 5,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    cartaDescubierta: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
    },
    cartaEncontrada: {
        backgroundColor: 'lightgreen',
    },
    textoCarta: {
        fontSize: 24,
    },
    mensajeGanador: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
});