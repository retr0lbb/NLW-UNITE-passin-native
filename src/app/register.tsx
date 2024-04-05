import { View, Image, StatusBar, Alert } from "react-native"
import { Input } from "@/components/input"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link, router } from "expo-router"
import { useState } from "react"


export default function Register(){
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")

    function handleRegister(){
        if(!fullName.trim() || !email.trim()){
            return Alert.alert("Inscrição", "Preencha todos os campos")
        }

        router.push("/ticket")
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

                <Button onPress={handleRegister} title="Realizar inscrição"/>

                <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    )
}


