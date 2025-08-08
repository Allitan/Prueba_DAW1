import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useJuego } from "../Provider/juegoProvider"

export default function PartidasComponent() {
    const { partidasJugadas } = useJuego();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Listado de Partidas</Text>
            <ScrollView style={styles.lista}>
                {partidasJugadas.map(partida => (
                    <Text key={partida.id} style={styles.item}>
                        Partida {partida.id}: {partida.resultado} ({partida.fecha})
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lista: {
        maxHeight: 180,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: 300,
    },
    item: {
        fontSize: 16,
        marginBottom: 5,
        padding: 5
    },
});