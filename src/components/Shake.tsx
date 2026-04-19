import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface ShakeRef {
    shake: () => void;
}

export interface ShakeProps {
    children: React.ReactNode;
    /** How many pixels to shift side-to-side. Default 8 */
    intensity?: number;
    /** Total animation duration in ms. Default 480 */
    duration?: number;
    style?: object;
}

/**
 * Horizontal shake for error feedback. Call `.shake()` via ref imperatively.
 * Perfect for wrong password, form errors, invalid input, rejection feedback.
 *
 * @example
 * const shakeRef = useRef<ShakeRef>(null);
 * // on error:
 * shakeRef.current?.shake();
 *
 * <Shake ref={shakeRef}>
 *   <TextInput ... />
 * </Shake>
 */
const Shake = forwardRef<ShakeRef, ShakeProps>(({
    children,
    intensity = 8,
    duration = 480,
    style,
}, ref) => {
    const translateX = useRef(new Animated.Value(0)).current;

    const shake = () => {
        const d = duration / 6;
        const i = intensity;

        Animated.sequence([
            Animated.timing(translateX, { toValue: -i,     duration: d, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(translateX, { toValue:  i,     duration: d, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(translateX, { toValue: -i * 0.7, duration: d, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(translateX, { toValue:  i * 0.7, duration: d, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(translateX, { toValue: -i * 0.3, duration: d, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(translateX, { toValue:  0,     duration: d, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        ]).start();
    };

    useImperativeHandle(ref, () => ({ shake }));

    return (
        <Animated.View style={[{ transform: [{ translateX }] }, style]}>
            {children}
        </Animated.View>
    );
});

Shake.displayName = 'Shake';

export default Shake;
