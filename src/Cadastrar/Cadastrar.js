import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Alert, TextInput,
  SafeAreaView, ScrollView, TouchableOpacity
} from 'react-native';
import { DatabaseConnection } from '../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker'; 

const db = DatabaseConnection.getConnection();

export default function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          telefone TEXT NOT NULL,
          tipo TEXT
        )`,
        [],
        () => console.log('Tabela criada com sucesso'),
        (_, error) => console.error('Erro ao criar a tabela:', error)
      );
    });
  }, []);

  const cadastrar = () => {
    if (!nome || !telefone || !tipo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para cadastrar o cliente.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO clientes (nome, telefone, tipo) VALUES (?, ?, ?)',
        [nome, telefone, tipo],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Sucesso', 'Cliente cadastrado com sucesso.');
            setNome('');
            setTelefone('');
            setTipo('');
          } else {
            Alert.alert('Erro', 'Não foi possível cadastrar o cliente.');
          }
        },
        (_, error) => console.error('Erro ao cadastrar cliente:', error)
      );
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputIconGroup}>
            <FontAwesome6 name="user" size={20} color="#e50914" />
            <TextInput
              style={styles.input}
              placeholder="Nome do Cliente"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputIconGroup}>
            <FontAwesome6 name="phone" size={20} color="#e50914" />
            <TextInput
              style={styles.input}
              placeholder="Telefone do Cliente"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>

          <View style={styles.inputIconGroup}>
            <FontAwesome6 name="tag" size={20} color="#e50914" />
            <Picker
              selectedValue={tipo}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
            >
              <Picker.Item label="Selecione o Tipo de contato" value="" />
              <Picker.Item label="Telefone" value="Telefone" />
              <Picker.Item label="Fixo" value="Fixo" />
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={cadastrar}
          >
            <FontAwesome6 name="plus-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Cadastrar Cliente</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: '#282c34',  
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  inputIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e50914',  
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
