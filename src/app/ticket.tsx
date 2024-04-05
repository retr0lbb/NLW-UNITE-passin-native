import Credential from "@/components/crential";
import Header from "@/components/header";
import { 
    TouchableOpacity, 
    ScrollView, 
    StatusBar, 
    Alert,
    Modal,
    View, 
    Text,
    Pressable, 
    Share
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"
import { useBadgeStore } from "@/store/badge-store"
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker"
import { Redirect } from "expo-router";
import QRCodeSvg from "@/components/qrcode";
import { err } from "react-native-svg";


export default function Ticket(){
    const [expandQRCode, setExpandQRCode] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleShare() {
        try {
            if(badgeStore.data?.checkInURL){
                await Share.share({
                    message: String(badgeStore.data.checkInURL)
                })
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Compartilhar", "Não foi possivel compartilhar.")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [ 4, 4 ]
            })

            if(result.assets){
                badgeStore.updateAvatar(result.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Foto", "não foi possivel selecionar a imagem.")
        }
    }



    if(!badgeStore.data?.checkInURL){
        return <Redirect href="/" />
    }

    console.log(badgeStore.data)
    return(
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content" />
            <Header title="Minha Credencial" />

            <ScrollView 
                className="-mt-28 -z-10" 
                contentContainerClassName="px-8 pb-8" 
                showsVerticalScrollIndicator={false}
            >

                <Credential 
                    onChangeAvatar={handleSelectImage}
                    onShowQRCode={() => setExpandQRCode(true)}
                    data={badgeStore.data}
                />

                <FontAwesome name="angle-double-down" 
                    size={24} 
                    color={colors.gray[300]} 
                    className="self-center my-6"
                />

                <Text className="text-white font-bold text-2xl mt-4">
                    Compartilhar credencial
                </Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do evento: 
                    {badgeStore.data.eventTitle}
                </Text>

                <Button title="Compartilhar" onPress={handleShare} />

                <Pressable className="mt-10" onPress={() => badgeStore.remove()}>
                    <Text className="text-base text-white font-bold text-center">
                        Remover Ingresso
                    </Text>
                </Pressable>
            </ScrollView>

            <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <Pressable className="" onPress={() => setExpandQRCode(false)}>
                        <QRCodeSvg value={String(badgeStore.data.checkInURL)} size={300} />
                        <Text className="font-body text-orange-500 text-sm text-center mt-10">Fechar QRCode</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    ) 
}