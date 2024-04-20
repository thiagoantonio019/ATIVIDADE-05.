import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home() {
    const navigation = useNavigation();

    const cadastrar = () => {
        navigation.navigate('Cadastrar');
    };

    const ExibirRegistros = () => {
        navigation.navigate('ExibirRegistros');
    };

    const Editar = () => {
        navigation.navigate('Editar');
    };

    const Pesquisar = () => {
        navigation.navigate('Pesquisar');
    };

    // Estados para controlar as animações
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.5)); // Inicia com a escala 0.5

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
                Seja bem-vindo!
            </Animated.Text>
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <FontAwesome5 name="user-plus" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ExibirRegistros}>
                    <FontAwesome5 name="film" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Exibir todos os clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Pesquisar}>
                    <FontAwesome5 name="search" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Pesquisar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        color: 'green', 
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#e50914', 
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
