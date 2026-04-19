import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface FadeSlideInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    style?: object;
}

const FadeSlideIn: React.FC<FadeSlideInProps> = ({
    children,
    delay = 0,
    duration = 380,
    distance = 35,
    direction = 'up',
    style,
}) => {
    const opacity   = useRef(new Animated.Value(0)).current;
    const translate = useRef(new Animated.Value(distance)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(translate, {
                toValue: 0,
                duration,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const getTransform = () => {
        switch (direction) {
            case 'down':  return [{ translateY: Animated.multiply(translate, -1) }];
            case 'left':  return [{ translateX: translate }];
            case 'right': return [{ translateX: Animated.multiply(translate, -1) }];
            case 'up':
            default:      return [{ translateY: translate }];
        }
    };

    return (
        <Animated.View style={[{ opacity, transform: getTransform() }, style]}>
            {children}
        </Animated.View>
    );
};

export default FadeSlideIn;
