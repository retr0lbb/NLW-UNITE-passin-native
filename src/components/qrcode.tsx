import { colors } from '@/styles/colors';
import { View, Text } from 'react-native';
import QrCodeSvg from 'react-native-qrcode-svg';

type Props = {
    value: string
    size: number
}

export default function QrCode({size, value} : Props){
    return(
        <QrCodeSvg 
            size={size} 
            value={value} 
            color={colors.green[200]}
            backgroundColor='transparent'
        />
    ) 
}