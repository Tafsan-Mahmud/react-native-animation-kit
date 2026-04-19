import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface ZoomFadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    /** Starting scale. Default 0.85 */
    fromScale?: number;
    style?: object;
}

/**
 * Zoom + fade entrance. Feels modern and polished.
 * Great for modals, image previews, profile screens, fullscreen cards.
 *
 * @example
 * <ZoomFadeIn>
 *   <Modal>...</Modal>
 * </ZoomFadeIn>
 *
 * // Subtle zoom for screen transitions
 * <ZoomFadeIn fromScale={0.96} duration={250}>
 *   <ScreenContent />
 * </ZoomFadeIn>
 */
const ZoomFadeIn: React.FC<ZoomFadeInProps> = ({
    children,
    delay = 0,
    duration = 360,
    fromScale = 0.85,
    style,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale   = useRef(new Animated.Value(fromScale)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>
            {children}
        </Animated.View>
    );
};

export default ZoomFadeIn;
