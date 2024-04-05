import { View, Image, ImageBackground, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons"
import { colors } from "@/styles/colors";
import QRCodeSvg from "./qrcode";
import {BadgeStore} from "@/store/badge-store"


type Props = {
    onChangeAvatar?: () => void,
    onShowQRCode?: ()=> void,
    data: BadgeStore
}

export default function Credential({ onChangeAvatar, onShowQRCode, data }: Props){
    return(
        <View className="w-full self-stretch items-center">
            <Image 
                source={require("@/assets/ticket/band.png")}
                className="w-24 h-52 z-10"
            />

            <View 
                className="bg-black/20 self-stretch 
                items-center pb-6 border 
                border-white/10 mx-3 rounded-2xl -mt-5">

                    <ImageBackground 
                        source={require("@/assets/ticket/header.png")}
                        className="px-6 py-8 h-40 items-center 
                        self-stretch border-b border-white/10 overflow-hidden" >
                            
                            <View className="w-full flex-row items-center justify-between">
                                <Text className="text-zinc-50 text-sm font-bold">
                                    {data.eventTitle}
                                </Text>
                                <Text className="text-zinc-50 text-sm font-bold">
                                    #{String(data.id).padStart(4 , "0")}
                                </Text>
                            </View>

                            <View className="w-40 h-40 bg-black rounded-full"/>
                </ImageBackground>
                
                {
                    data.image ? 
                    (
                        <Pressable onPress={onChangeAvatar}>
                            <Image 
                            source={{ uri: String(data.image)}} 
                            className="w-36 h-36 rounded-full -mt-24" 
                            />
                        </Pressable>
                    ) : (
                        <Pressable onPress={onChangeAvatar} className="w-36 h-36 
                        rounded-full -mt-24 bg-gray-400 items-center justify-center">
                            <Feather name="camera" color={colors.green[400]} size={32}/>
                        </Pressable>
                    )
                }
               

                

                <Text className="font-bold text-2xl text-zinc-50 mt-4">
                    {data.name}
                </Text>
                <Text className="font-regular text-base text-zinc-300 mb-4">
                    {data.email}
                </Text>


                <QRCodeSvg value={String(data.checkInURL)} size={120} />

                <Pressable className="mt-6" onPress={onShowQRCode}>
                    <Text className="font-body text-orange-500 text-sm">Ampliar QRCode</Text>
                </Pressable>
            </View>
        </View>
    )
}