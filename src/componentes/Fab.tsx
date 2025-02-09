import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props{
    title: string;
    position: 'button_right' | 'button_left';
    action: () => void;
}


export const Fab = ( { title, position, action }:Props ) => {
    
    return(
        <TouchableOpacity
            onPress={ action }
            style={ ( position == 'button_right' ) ? styles.fabLocationBR : styles.fabLocationBL  }
        >
            <View
                style={ styles.fab }
            >
                <Text
                    style={ styles.fabText }
                >
                    { title }
                </Text>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    fab:{
        backgroundColor: "violet",
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: "center"
    },
    fabText:{
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
    },
    fabLocationBR:{
        position: "absolute",
        bottom: 25,
        right: 25,
    },
    fabLocationBL:{
        position: "absolute",
        bottom: 25,
        left: 25,
    }

});