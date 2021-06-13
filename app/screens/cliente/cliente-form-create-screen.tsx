import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Alert, FlatList , Text} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
//import DatePicker from 'react-native-datepicker'
import DatePicker from 'react-native-datepicker'
import ClienteService from "../../services/cliente-service"
import ServicoService from "../../services/servico-service"
import ClienteModel from "../../models/cliente-model"
import RadioGroup from "react-native-radio-buttons-group"

const FULL: ViewStyle = {
  flex: 1,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_SELECT: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
  marginTop: 20
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const ClienteFormCreateScreen = observer(function ClienteFormCreateScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const clienteService = new ClienteService()
  const servicoService = new ServicoService()

  
  const [dataNascimento, setSelecionarDataNascimento] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [status, setSelecionarStatus] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [servicoId, setSelecionarServicoId] = useState("");
  const [servicos, setServicos] = useState([]);

  
  async function loadServicos() {
    setServicos(await servicoService.getServicos())
   
  }

  useEffect(() => {
    loadServicos()
  }, [])
  
  async function adicionarNovoCliente() {
   
    if (servicoId) {
      const cliente = new ClienteModel({
        nome: nomeSelecionado,
        imagem: imagemSelecionada,
        dataNascimento,
        status,
        servicoId
      })
      
      await clienteService.saveCliente(cliente)

      navigation.navigate("home")
      navigation.navigate("clienteList")
    } else {
        Alert.alert(
          "Atenção",
          "Olá antes de cadastrar o Cliente é necessário cadastrar um Tipo de Serviço",
          [
            { text: "OK", onPress: () => navigation.navigate('home') }
          ]
        );
      }
    }

  return (
    <View testID="ClienteListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerText="Adicionar Cliente"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
          <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Data de Nascimento"
            style={{width: 200, backgroundColor: "white"}}
            date={dataNascimento}
            onDateChange={setSelecionarDataNascimento}></DatePicker>
          <TextField
            value={status}
            onChangeText={setSelecionarStatus}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Status"/>
            
            <TextField
            value={imagemSelecionada}
            onChangeText={setImagemSelecionada}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Informe a Url da imagem"/>

          </View>
          <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={servicos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.nome} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={servicoId===item.id}
                          onPress={() => {
                            setSelecionarServicoId(item.id)
                            
                          }}
                          text="Selecionar"
                          >
                            
                          </Button>
                      
                      </View>
                    )}
                  />
                  <View>
          <Button
            style={BUTTON_ADD}
            text="Salvar Alterações"
            onPress={() => { adicionarNovoCliente() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
