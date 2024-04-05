import { View, Image, StatusBar, Alert } from "react-native"
import { Input } from "@/components/input"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link } from "expo-router"
import {useState} from "react"
import { api } from "@/server/api"


export default function Home(){
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleAcessCredential(){
        try {
            if(!code.trim()){
                return Alert.alert("Ingresso", "Informe o codigo do ingresso")
            }
    
            setIsLoading(true)
           const { data } = await api.get(`/attendees/${code}/badge`)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            Alert.alert("Ingresso", "Ingresso não encontrado")
        }
    }


    return(
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
            <StatusBar barStyle="dark-content" />
            <Image 
            source={require("@/assets/logo.png")} 
            className="h-16" 
            resizeMode="contain"/>
            <View className="w-full mt-12 gap-3">
                <Input>
                <MaterialCommunityIcons 
                name="ticket-confirmation-outline" 
                size={20} 
                color={colors.green[200]}/>
                    
                    <Input.Field 
                    placeholder="Insira o seu codigo de ingresso" 
                    onChangeText={setCode}
                    value={code}
                    />
                </Input>

                <Button onPress={handleAcessCredential} title="Acessar Credencial"/>
                <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    )
}


