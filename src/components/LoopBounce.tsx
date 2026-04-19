import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface LoopBounceProps {
    children: React.ReactNode;
    /** Distance in px to travel up. Default 10 */
    height?: number;
    /** Duration of one full bounce cycle in ms. Default 800 */
    duration?: number;
    /** Delay before starting. Default 0 */
    delay?: number;
    /** Number of repeats. -1 = infinite. Default -1 */
    iterations?: number;
    style?: object;
}

/**
 * Looping vertical bounce. Grabs user attention gently.
 * Great for scroll-down indicators, empty states, floating CTAs, tutorial pointers.
 *
 * @example
 * // Scroll cue
 * <LoopBounce>
 *   <ChevronDownIcon />
 * </LoopBounce>
 *
 * // Slow float
 * <LoopBounce height={6} duration={1600}>
 *   <FloatingBadge />
 * </LoopBounce>
 */
const LoopBounce: React.FC<LoopBounceProps> = ({
    children,
    height = 10,
    duration = 800,
    delay = 0,
    iterations = -1,
    style,
}) => {
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const half = duration / 2;

        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -height,
                    duration: half,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: half,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ]),
            { iterations }
        );

        const t = setTimeout(() => loop.start(), delay);
        return () => {
            clearTimeout(t);
            loop.stop();
        };
    }, []);

    return (
        <Animated.View style={[{ transform: [{ translateY }] }, style]}>
            {children}
        </Animated.View>
    );
};

export default LoopBounce;
