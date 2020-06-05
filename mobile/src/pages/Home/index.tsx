import React from 'react';
import { View, ImageBackground, Image, Text,Touchable } from 'react-native';
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon} from '@expo/vector-icons'


const logo = require('../../assets/logo.png');
const background = require('../../assets/home-background.png');

const Home = () =>{
    
    return (
        <ImageBackground 
            style={styles.container} 
            source={background}
            imageStyle={styles.imageBackground}
        >
            <View style={styles.main}>
                <Image source={logo}/> 
                <Text style={styles.title} > Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style = {styles.footer}>
                <RectButton style={styles.button} onPress={()=>{}}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
        
        
    );
};

export default Home;