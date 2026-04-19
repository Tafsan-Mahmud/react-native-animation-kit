import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface BounceInProps {
    children: React.ReactNode;
    delay?: number;
    /** Distance in px to bounce from. Default 60 */
    distance?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    friction?: number;
    tension?: number;
    style?: object;
}

/**
 * Springy bounce entrance. More energetic than FadeSlideIn — use for
 * success states, empty screens, onboarding illustrations, hero elements.
 */
const BounceIn: React.FC<BounceInProps> = ({
    children,
    delay = 0,
    distance = 60,
    direction = 'up',
    friction = 6,
    tension = 60,
    style,
}) => {
    const opacity   = useRef(new Animated.Value(0)).current;
    const translate = useRef(new Animated.Value(distance)).current;

    useEffect(() => {
        const run = () => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 180,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.spring(translate, {
                    toValue: 0,
                    friction,
                    tension,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        if (delay > 0) {
            const t = setTimeout(run, delay);
            return () => clearTimeout(t);
        } else {
            run();
        }
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

export default BounceIn;
