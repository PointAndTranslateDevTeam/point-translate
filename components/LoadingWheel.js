import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const LoadingWheel = (props) => {
    return (
        <Modal transparent={true} visible={props.showLoading} animationType="slide" style={[styles.container, styles.horizontal]}>
            <View> 
                <ActivityIndicator hidesWhenStopped={false} size="large" color="white" animating={true} style={styles.activityIndicator}/>
            </View>   
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    loadingText: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
    }
})

export default LoadingWheel;