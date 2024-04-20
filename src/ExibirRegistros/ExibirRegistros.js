import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Alert, TextInput,
  SafeAreaView, Platform, ScrollView, TouchableOpacity
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const db = DatabaseConnection.getConnection();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [id, setId] = useState(null);
  const [isCadastro, setIsCadastro] = useState(true);

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
        (_, error) => console.error(error)
      );
    });
    ExibirRegistros();
  }, []);

  const ExibirRegistros = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM clientes',
        [],
        (_, { rows }) => setTodos(rows._array),
        (_, error) => console.error('Erro ao buscar todos:', error)
      );
    });
  };

  const handleButtonPress = (cliente) => {
    setInputText(cliente.nome);
    setTelefone(cliente.telefone);
    setTipo(cliente.tipo);
    setId(cliente.id);
    setIsCadastro(false);
  };

  const salvarEdicao = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE clientes SET nome = ?, telefone = ?, tipo = ? WHERE id = ?',
        [inputText, telefone, tipo, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Cliente atualizado com sucesso');
            setIsCadastro(true);
            ExibirRegistros();
            resetFields();
          } else {
            Alert.alert('Erro ao atualizar cliente');
          }
        },
        (_, error) => console.error('Erro ao atualizar cliente:', error)
      );
    });
  };

  const excluiCliente = (id) => {
    Alert.alert(
      "Excluir Cliente",
      "Você realmente deseja excluir este cliente?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => realmenteExcluirCliente(id) }
      ],
      { cancelable: false }
    );
  };

  const realmenteExcluirCliente = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM clientes WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Cliente excluído com sucesso');
            ExibirRegistros();
          } else {
            Alert.alert('Erro ao excluir cliente');
          }
        },
        (_, error) => console.error('Erro ao excluir cliente:', error)
      );
    });
  };

  const resetFields = () => {
    setInputText('');
    setTelefone('');
    setTipo('');
    setId(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {!isCadastro && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nome do Cliente"
                value={inputText}
                onChangeText={setInputText}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone do Cliente"
                value={telefone}
                onChangeText={setTelefone}
              />
              <TextInput
                style={styles.input}
                placeholder="Tipo do Cliente"
                value={tipo}
                onChangeText={setTipo}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={salvarEdicao}
              >
                <Text style={styles.buttonText}>Salvar Edição</Text>
              </TouchableOpacity>
            </>
          )}
          {todos.map((cliente) => (
            <View key={cliente.id} style={styles.clienteItem}>
              <Text style={styles.text}>Nome: {cliente.nome}</Text>
              <Text style={styles.text}>Telefone: {cliente.telefone}</Text>
              <Text style={styles.text}>Tipo: {cliente.tipo}</Text>
              <View style={styles.buttonTable}>
                <TouchableOpacity onPress={() => handleButtonPress(cliente)}>
                  <FontAwesome6 name="pen-to-square" size={24} color="silver" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluiCliente(cliente.id)}>
                  <FontAwesome6 name="trash-can" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: '#282c34',
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    borderColor: '#e50914',
    backgroundColor: '#40454f',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e50914',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  clienteItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
