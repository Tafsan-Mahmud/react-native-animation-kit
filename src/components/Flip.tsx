import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export interface FlipProps {
    /** Content for the front face */
    front: React.ReactNode;
    /** Content for the back face */
    back: React.ReactNode;
    /** Which face is currently shown. Control externally. */
    flipped?: boolean;
    duration?: number;
    style?: object;
}

/**
 * 3D card flip between two faces. Fully controlled via the `flipped` prop.
 * Perfect for flashcards, reveal mechanics, auth toggles, info cards.
 *
 * @example
 * const [flipped, setFlipped] = useState(false);
 *
 * <TouchableOpacity onPress={() => setFlipped(f => !f)}>
 *   <Flip
 *     flipped={flipped}
 *     front={<FrontCard />}
 *     back={<BackCard />}
 *   />
 * </TouchableOpacity>
 */
const Flip: React.FC<FlipProps> = ({
    front,
    back,
    flipped = false,
    duration = 420,
    style,
}) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const [showBack, setShowBack] = useState(false);

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: flipped ? 1 : 0,
            duration,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [flipped]);

    // Switch which face is "on top" at the midpoint
    useEffect(() => {
        const id = rotateAnim.addListener(({ value }) => {
            setShowBack(value >= 0.5);
        });
        return () => rotateAnim.removeListener(id);
    }, []);

    const frontRotate = rotateAnim.interpolate({
        inputRange:  [0, 0.5, 1],
        outputRange: ['0deg', '-90deg', '-180deg'],
    });

    const backRotate = rotateAnim.interpolate({
        inputRange:  [0, 0.5, 1],
        outputRange: ['180deg', '90deg', '0deg'],
    });

    return (
        <View style={style}>
            {/* Front */}
            <Animated.View
                style={[
                    styles.face,
                    { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] },
                    showBack && styles.hidden,
                ]}
            >
                {front}
            </Animated.View>

            {/* Back */}
            <Animated.View
                style={[
                    styles.face,
                    { transform: [{ perspective: 1000 }, { rotateY: backRotate }] },
                    !showBack && styles.hidden,
                ]}
            >
                {back}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    face: {
        backfaceVisibility: 'hidden',
    },
    hidden: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Flip;
