import React, { useEffect, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { Avatar } from 'react-native-elements'
import VeterinarioService from "../../services/veterinario-service"

const FULL: ViewStyle = {
  flex: 1,
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
  flexDirection: "row",
  padding: 10,
  alignSelf: "center",
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const BUTTON_EDIT: ViewStyle = {
  backgroundColor: "#2196F3",
  alignSelf: "stretch",
  width: 70,
}
const BUTTON_REMOVE: ViewStyle = {
  backgroundColor: "#FA5035",
  alignSelf: "stretch",
  width: 70,
  marginLeft: 10,
}

export const VeterinarioListScreen = observer(function VeterinarioListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  
  const veterinarioService = new VeterinarioService()
  const { veterinarioStore } = useStores()
  
  const [veterinarios, setVeterinarios] = useState([])

  useEffect(() => {
    async function fetchData() {
      setVeterinarios(await veterinarioService.getVeterinarios())
    }
    fetchData()
  }, [])

  async function removerVeterinario(id: string) {
    try {
      await veterinarioService.removeVeterinario(id)
      Alert.alert(
        "Atenção",
        "Veterinário removido com sucesso!"
      )
    } catch (e) {
      console.log(e)
      Alert.alert(
        "Atenção",
        "Ocorreu um erro ao tentar remover o veterinário!"
      )
    }
  }

  return (
    <View testID="VeterinarioListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Lista de Veterinários"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <Button
            style={BUTTON_ADD}
            text="Adicionar Veterinário"
            onPress={() => navigation.navigate("veterinarioFormCreate")}></Button>
        </View>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={veterinarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              
              <Avatar 
                    rounded
                    source={{uri: item.imagem}} />
              
              <Text style={LIST_TEXT}>
                {item.nome} {"\n"}({item.status}) {"\n"}
                {item.especialidade} {"\n"}
                {item.dataAtendimento}{"\n"}
                

                
              </Text>
              <Button
                style={BUTTON_EDIT}
                onPress={()=> {
                  veterinarioStore.setVeterinarioId(item.id)
                  navigation.navigate("veterinarioFormEdit")
                }}
                text="Editar"></Button>
              <Button
                style={BUTTON_REMOVE}
                onPress={() => { 
                  removerVeterinario(item.id) 
                  navigation.navigate("home")
                  navigation.navigate("veterinarioList")}
                }
                text="Remover"></Button>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
