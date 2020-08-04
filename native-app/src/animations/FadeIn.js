import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const FadeIn = (props) => {
    const fadeIn = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeIn]);

    return (
        <Animated.View style={{...props.style, opacity: fadeIn}}> 
            {props.children}
        </Animated.View>
    )
};

export default FadeIn;