import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export interface ScalePopProps {
    children: React.ReactNode;
    delay?: number;
    /** How far above 1.0 the scale overshoots before settling. Default 0.08 */
    overshoot?: number;
    friction?: number;
    tension?: number;
    style?: object;
}

/**
 * Spring-powered scale pop. Grows from 0 → 1 with a satisfying overshoot.
 * Perfect for modals, badges, FABs, bottom sheets, and confirmation icons.
 */
const ScalePop: React.FC<ScalePopProps> = ({
    children,
    delay = 0,
    friction = 7,
    tension = 80,
    style,
}) => {
    const scale   = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const run = () => {
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1,
                    friction,
                    tension,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 120,
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

    return (
        <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>
            {children}
        </Animated.View>
    );
};

export default ScalePop;
