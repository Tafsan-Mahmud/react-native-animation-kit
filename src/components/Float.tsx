import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export interface FloatProps {
    children: React.ReactNode;
    /**
     * Vertical float distance in px.
     * @default 8
     */
    height?: number;
    /**
     * Subtle rotation in degrees at peak of float.
     * Set to 0 to disable. @default 1.5
     */
    rotate?: number;
    /**
     * Subtle scale at peak of float.
     * Set to 1 to disable. @default 1.03
     */
    maxScale?: number;
    /**
     * Duration of one full float cycle in ms.
     * @default 2400
     */
    duration?: number;
    /**
     * Delay before starting in ms. Useful for staggering multiple floaters.
     * @default 0
     */
    delay?: number;
    /**
     * Easing style.
     * - 'gentle'  — smooth sine wave, natural and calm (default)
     * - 'buoyant' — slight spring feel, more lively
     * @default 'gentle'
     */
    variant?: 'gentle' | 'buoyant';
    style?: object;
}

/**
 * Premium multi-axis floating animation.
 * Combines vertical movement, subtle rotation, and gentle scale
 * for a truly floating effect — far more lifelike than a simple bounce.
 *
 * Great for: hero illustrations, empty states, onboarding art,
 * floating badges, product cards, mascots, and decorative elements.
 *
 * @example
 * // Basic float
 * <Float>
 *   <IllustrationImage />
 * </Float>
 *
 * // Stagger multiple elements for a layered depth effect
 * <Float delay={0}>
 *   <BackgroundLayer />
 * </Float>
 * <Float delay={300} height={6} rotate={1}>
 *   <MiddleLayer />
 * </Float>
 * <Float delay={600} height={10} rotate={2}>
 *   <ForegroundLayer />
 * </Float>
 *
 * // Disable rotation and scale for a pure vertical float
 * <Float rotate={0} maxScale={1}>
 *   <Card />
 * </Float>
 */
const Float: React.FC<FloatProps> = ({
    children,
    height   = 8,
    rotate   = 1.5,
    maxScale = 1.03,
    duration = 2400,
    delay    = 0,
    variant  = 'gentle',
    style,
}) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const rotation   = useRef(new Animated.Value(0)).current;
    const scale      = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const half    = duration / 2;
        const easeIn  = variant === 'buoyant'
            ? Easing.out(Easing.quad)
            : Easing.inOut(Easing.sin);
        const easeOut = variant === 'buoyant'
            ? Easing.in(Easing.quad)
            : Easing.inOut(Easing.sin);

        const floatY = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue:         -height,
                    duration:        half,
                    easing:          easeIn,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue:         0,
                    duration:        half,
                    easing:          easeOut,
                    useNativeDriver: true,
                }),
            ])
        );

        const floatRotate = Animated.loop(
            Animated.sequence([
                Animated.timing(rotation, {
                    toValue:         1,
                    duration:        half,
                    easing:          Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue:         0,
                    duration:        half,
                    easing:          Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        );

        const floatScale = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue:         maxScale,
                    duration:        half,
                    easing:          Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue:         1,
                    duration:        half,
                    easing:          Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        );

        const t = setTimeout(() => {
            floatY.start();
            floatRotate.start();
            floatScale.start();
        }, delay);

        return () => {
            clearTimeout(t);
            floatY.stop();
            floatRotate.stop();
            floatScale.stop();
        };
    }, [height, rotate, maxScale, duration, delay, variant]);

    const rotateInterpolate = rotation.interpolate({
        inputRange:  [0, 1],
        outputRange: [`-${rotate}deg`, `${rotate}deg`],
    });

    return (
        <Animated.View
            style={[
                {
                    transform: [
                        { translateY },
                        { rotate: rotateInterpolate },
                        { scale },
                    ],
                },
                style,
            ]}
        >
            {children}
        </Animated.View>
    );
};

export default Float;