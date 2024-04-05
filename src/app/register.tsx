import { View, Image, StatusBar, Alert, findNodeHandle } from "react-native"
import { Input } from "@/components/input"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link, router } from "expo-router"
import { useState } from "react"
import { api } from "@/server/api"
import axios from "axios"


export default function Register(){
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleRegister(){
        if(!fullName.trim() || !email.trim() || fullName.trim().length < 4){
            return Alert.alert("Inscrição", "Preencha todos os campos")
        }
        try {
            setIsLoading(true)

            const registerResponse = await api.post("/events/ea15b680-4105-4ec4-a420-dc0624421622/attendees", {
                name: fullName,
                email: email
            })

            if(registerResponse.data.attendeeId){
                Alert.alert("Inscrição", "inscrição realizada com sucesso", [
                    {
                        text: "Ok",
                        onPress: ()=> {
                            router.push("/ticket")
                        }
                    }
                ])
            }

        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(String(error.response?.data.message).includes("already register")){
                    return Alert.alert("Inscrição", "Esse email já esta cadastrado!")
                }
            }

            Alert.alert("Inscrição", "Um erro ocorreu")
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
                    <FontAwesome6 
                    name="user-circle" 
                    size={20} 
                    color={colors.green[200]}/>

                    <Input.Field 
                     placeholder="Nome completo" 
                     onChangeText={setFullName} 
                     value={fullName}/>
                </Input>

                <Input>
                    <MaterialIcons 
                    name="alternate-email" 
                    size={20} 
                    color={colors.green[200]}/>

                    <Input.Field 
                     placeholder="Email" 
                     keyboardType="email-address" 
                     onChangeText={setEmail} 
                     value={email}/>
                </Input>

                <Button onPress={handleRegister} title="Realizar inscrição" isLoading={isLoading}/>

                <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    )
}


