import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface SpinProps {
    children: React.ReactNode;
    /** Duration of one full 360° rotation in ms. Default 900 */
    duration?: number;
    /** Clockwise by default. Set to -1 for counter-clockwise. */
    direction?: 1 | -1;
    style?: object;
}

/**
 * Continuous rotation. Zero-config spinner wrapper.
 * Wrap any icon, image, or view to make it spin.
 *
 * @example
 * // Spin a feather icon
 * <Spin>
 *   <Icon name="loader" size={24} color="#6366F1" />
 * </Spin>
 *
 * // Slow counter-clockwise
 * <Spin duration={2000} direction={-1}>
 *   <RefreshIcon />
 * </Spin>
 */
const Spin: React.FC<SpinProps> = ({
    children,
    duration = 900,
    direction = 1,
    style,
}) => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        loop.start();
        return () => loop.stop();
    }, []);

    const rotate = rotation.interpolate({
        inputRange:  [0, 1],
        outputRange: direction === 1 ? ['0deg', '360deg'] : ['360deg', '0deg'],
    });

    return (
        <Animated.View style={[{ transform: [{ rotate }] }, style]}>
            {children}
        </Animated.View>
    );
};

export default Spin;
