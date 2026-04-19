import React, { useRef } from 'react';
import {
    Animated,
    GestureResponderEvent,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export interface PressScaleProps {
    children: React.ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
    onLongPress?: (e: GestureResponderEvent) => void;
    /** Scale when pressed. Default 0.95 */
    activeScale?: number;
    /** Animation duration in ms. Default 120 */
    duration?: number;
    disabled?: boolean;
    style?: object;
}

/**
 * Drop-in Touchable with a satisfying press-scale effect.
 * Replaces TouchableOpacity with a more physical, premium feel.
 * Use for buttons, cards, list items — anything tappable.
 *
 * @example
 * <PressScale onPress={handleSubmit}>
 *   <View style={styles.button}>
 *     <Text>Submit</Text>
 *   </View>
 * </PressScale>
 *
 * // Subtle card press
 * <PressScale activeScale={0.97} onPress={() => nav.navigate('Detail')}>
 *   <Card />
 * </PressScale>
 */
const PressScale: React.FC<PressScaleProps> = ({
    children,
    onPress,
    onLongPress,
    activeScale = 0.95,
    duration = 120,
    disabled = false,
    style,
}) => {
    const scale = useRef(new Animated.Value(1)).current;

    const animateTo = (toValue: number, cb?: () => void) => {
        Animated.spring(scale, {
            toValue,
            useNativeDriver: true,
            friction: 6,
            tension: 200,
        }).start(cb);
    };

    const handlePressIn = () => {
        if (!disabled) animateTo(activeScale);
    };

    const handlePressOut = () => {
        animateTo(1);
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={disabled ? undefined : onPress}
            onLongPress={disabled ? undefined : onLongPress}
            disabled={disabled}
        >
            <Animated.View style={[{ transform: [{ scale }] }, style]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default PressScale;
