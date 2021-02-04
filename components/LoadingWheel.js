import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const LoadingWheel = (props) => {
    return (
        <Modal transparent={true} visible={props.showLoading} animationType="slide">
            <View>
                <Text>Loading...</Text>
            </View>
        </Modal>
    );
}

export default LoadingWheel;