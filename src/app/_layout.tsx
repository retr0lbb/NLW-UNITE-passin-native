import "@/styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar"
import {Loading} from "@/components/loading"
import { 
    Roboto_700Bold, 
    Roboto_400Regular, 
    Roboto_500Medium, 
    useFonts 
} from "@expo-google-fonts/roboto"

export default function Layout(){
    const [ fontLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })

    return(
        <>
            <StatusBar style="light" />
            {fontLoaded? <Slot /> : <Loading />}
        </>
    )
}