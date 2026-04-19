import React, { Children, isValidElement, cloneElement } from 'react';
import FadeSlideIn from './FadeSlideIn';

export interface StaggerProps {
    children: React.ReactNode;
    /** Initial delay before the first child animates. Default 0 */
    initialDelay?: number;
    /** Ms between each child animation. Default 80 */
    stagger?: number;
    duration?: number;
    distance?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Automatically wraps each child in a FadeSlideIn with staggered delays.
 * The cleanest way to animate lists, grids, and any sequence of items.
 *
 * @example
 * // Stagger a list of cards
 * <Stagger>
 *   <CardA />
 *   <CardB />
 *   <CardC />
 * </Stagger>
 *
 * // Custom timing
 * <Stagger stagger={60} direction="left">
 *   {items.map(item => <Item key={item.id} {...item} />)}
 * </Stagger>
 */
const Stagger: React.FC<StaggerProps> = ({
    children,
    initialDelay = 0,
    stagger = 80,
    duration = 380,
    distance = 35,
    direction = 'up',
}) => {
    const childArray = Children.toArray(children);

    return (
        <>
            {childArray.map((child, index) => (
                <FadeSlideIn
                    key={index}
                    delay={initialDelay + index * stagger}
                    duration={duration}
                    distance={distance}
                    direction={direction}
                >
                    {child}
                </FadeSlideIn>
            ))}
        </>
    );
};

export default Stagger;
