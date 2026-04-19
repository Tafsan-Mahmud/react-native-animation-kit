import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, TextStyle } from 'react-native';

export interface CountUpProps {
    /** Target number to count up to */
    to: number;
    /** Starting number. Default 0 */
    from?: number;
    duration?: number;
    delay?: number;
    /** Number of decimal places. Default 0 */
    decimals?: number;
    /** Optional prefix e.g. '$' */
    prefix?: string;
    /** Optional suffix e.g. '%' or 'k' */
    suffix?: string;
    style?: TextStyle;
    /** Custom formatter — overrides decimals/prefix/suffix */
    formatter?: (value: number) => string;
}

/**
 * Animated counter that counts from one number to another.
 * Perfect for stats, dashboards, earnings, scores, progress numbers.
 *
 * @example
 * // $1,240 earnings counter
 * <CountUp to={1240} prefix="$" duration={1200} />
 *
 * // Percentage
 * <CountUp to={87} suffix="%" duration={900} />
 *
 * // Custom format
 * <CountUp to={4800} formatter={n => `${(n / 1000).toFixed(1)}k`} />
 */
const CountUp: React.FC<CountUpProps> = ({
    to,
    from = 0,
    duration = 1000,
    delay = 0,
    decimals = 0,
    prefix = '',
    suffix = '',
    style,
    formatter,
}) => {
    const anim   = useRef(new Animated.Value(from)).current;
    const [display, setDisplay] = useState(
        formatter ? formatter(from) : `${prefix}${from.toFixed(decimals)}${suffix}`
    );

    useEffect(() => {
        const id = anim.addListener(({ value }) => {
            setDisplay(
                formatter
                    ? formatter(value)
                    : `${prefix}${value.toFixed(decimals)}${suffix}`
            );
        });

        const run = () => {
            anim.setValue(from);
            Animated.timing(anim, {
                toValue: to,
                duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false, // JS-driven — needs value listener
            }).start();
        };

        const t = setTimeout(run, delay);

        return () => {
            clearTimeout(t);
            anim.removeListener(id);
        };
    }, [to, from]);

    return <Text style={style}>{display}</Text>;
};

export default CountUp;
