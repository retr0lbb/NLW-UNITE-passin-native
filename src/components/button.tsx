import { TouchableOpacity, Text } from "react-native"


interface ButtonProps{
    title?: string
}

export function Button({ title}: ButtonProps){
    return(
        <TouchableOpacity className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg">
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}