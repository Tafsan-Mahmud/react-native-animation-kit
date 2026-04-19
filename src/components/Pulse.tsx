import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface PulseProps {
    children: React.ReactNode;
    /** Minimum scale (breathe-out). Default 0.94 */
    minScale?: number;
    /** Maximum scale (breathe-in). Default 1.06 */
    maxScale?: number;
    /** Duration of one full pulse cycle in ms. Default 1400 */
    duration?: number;
    delay?: number;
    style?: object;
}

/**
 * Looping scale pulse. Draws attention without being distracting.
 * Great for live indicators, notification dots, loading placeholders, CTA buttons.
 */
const Pulse: React.FC<PulseProps> = ({
    children,
    minScale = 0.94,
    maxScale = 1.06,
    duration = 1400,
    delay = 0,
    style,
}) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const halfDuration = duration / 2;

        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: maxScale,
                    duration: halfDuration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: minScale,
                    duration: halfDuration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        );

        const t = setTimeout(() => loop.start(), delay);
        return () => {
            clearTimeout(t);
            loop.stop();
        };
    }, []);

    return (
        <Animated.View style={[{ transform: [{ scale }] }, style]}>
            {children}
        </Animated.View>
    );
};

export default Pulse;
