import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import getAudio from '../API/getAudio';
import styles from '../styles/AudioButtonStyle'


const AudioButton = () => {
    return (
        <TouchableOpacity onPress={() => getAudio("hello world!")} style={styles.audioContainer}>
            <MaterialIcons name="play-circle-filled" size={80} color="#7AEEBA" style={styles.outerCircle} />
        </TouchableOpacity>
    )
}



export default AudioButton
