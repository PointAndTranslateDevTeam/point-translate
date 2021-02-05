import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import getAudio from '../API/getAudio';
import styles from '../styles/AudioButtonStyle'


const AudioButton = (text) => {
    console.log("type", typeof text);
    return (
        <TouchableOpacity onPress={() => getAudio(JSON.stringify(text))} style={styles.audioContainer}>
            <MaterialIcons name="play-circle-filled" size={40} color="#7AEEBA" style={styles.outerCircle} />
        </TouchableOpacity>
    )
}



export default AudioButton
