import React from 'react';
import { StyleSheet, Modal, ActivityIndicator } from 'react-native';

const LoadingWheel = (props) => {
    return (
        <Modal transparent={true} visible={props.showLoading} animationType="none" style={styles.container}>
            <ActivityIndicator visible={props.showLoading}  size="large" color="white" style={styles.activityIndicator}/>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    loadingText: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center"
    }
})

export default LoadingWheel;