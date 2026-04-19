import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    style?: object;
}

/**
 * Simple opacity fade-in. The lightest entrance animation.
 * Great for overlays, tooltips, and subtle content reveals.
 */
const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    duration = 320,
    style,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration,
            delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[{ opacity }, style]}>
            {children}
        </Animated.View>
    );
};

export default FadeIn;
