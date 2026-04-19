<div align="center">

<a href="https://www.npmjs.com/package/react-native-animation-kit">
  <img src="https://capsule-render.vercel.app/api?type=soft&color=0:000000,60:0d1117,100:1a1a2e&height=90&text=react-native-animation-kit&fontSize=28&fontColor=ffffff&animation=twinkling" width="82%"/>
</a>

**Premium animation components for React Native.**

React Native animation library with fade, slide, bounce, spring, flip, shake, stagger and more. Zero dependencies. Native driver only.

[![npm version](https://img.shields.io/npm/v/react-native-animation-kit?style=flat-square&colorA=18181b&colorB=18181b)](https://www.npmjs.com/package/react-native-animation-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-native-animation-kit?style=flat-square&colorA=18181b&colorB=18181b)](https://www.npmjs.com/package/react-native-animation-kit)
[![license](https://img.shields.io/npm/l/react-native-animation-kit?style=flat-square&colorA=18181b&colorB=18181b)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue?style=flat-square&colorA=18181b&colorB=3178c6)](https://www.typescriptlang.org)
[![Expo](https://img.shields.io/badge/Expo-compatible-000020?style=flat-square&colorA=18181b&colorB=000020&logo=expo)](https://expo.dev)

</div>

---

## Why react-native-animation-kit?

Most animation libraries for React Native either require heavy native setup (Reanimated, Gesture Handler) or produce janky JS-thread animations. `react-native-animation-kit` is different:


- **Zero dependencies** — only `react` and `react-native`. No linking, no pods, no setup.
- **100% native driver** — every animation runs on the UI thread. Silky smooth on any device.
- **13 ready-to-use components** — entrances, loops, interactions, and utilities. Every daily need covered.
- **Sensible defaults** — drop in any component with zero config. Customize when you need to.
- **Fully typed** — complete TypeScript support with exported prop types.

---

## Installation

```bash
npm install react-native-animation-kit
```

```bash
yarn add react-native-animation-kit
```

No additional setup. Works with React Native and Expo out of the box.

---

## Components

### Entrance animations

| Component | Description |
|---|---|
| [`FadeSlideIn`](#fadeslide) | Fade + directional slide. The workhorse entrance animation. |
| [`FadeIn`](#fadein) | Simple opacity fade. Lightweight and subtle. |
| [`ZoomFadeIn`](#zoomfadein) | Scale + fade. Modern feel for modals and screens. |
| [`BounceIn`](#bouncein) | Spring-powered bounce entrance. Energetic and satisfying. |
| [`ScalePop`](#scalepop) | Grows from 0 with a spring overshoot. Perfect for badges and FABs. |

### Loop animations

| Component | Description |
|---|---|
| [`Pulse`](#pulse) | Breathe in/out scale loop. Draws attention without distraction. |
| [`Spin`](#spin) | Continuous rotation. Zero-config spinner wrapper. |
| [`LoopBounce`](#loopbounce) | Gentle floating bounce. Great for scroll cues and empty states. |

### Interaction

| Component | Description |
|---|---|
| [`PressScale`](#pressscale) | Touchable with press-scale feedback. Replaces `TouchableOpacity`. |
| [`Shake`](#shake) | Horizontal shake for error feedback. Triggered imperatively via ref. |
| [`Flip`](#flip) | 3D card flip between two faces. Controlled via `flipped` prop. |

### Utilities

| Component | Description |
|---|---|
| [`Stagger`](#stagger) | Wraps children in staggered `FadeSlideIn` automatically. |
| [`CountUp`](#countup) | Animated number counter. Perfect for stats and dashboards. |

---

## Usage

### FadeSlideIn <a id="fadeslide"></a>

The most versatile entrance animation. Combines fade with a directional slide.

```tsx
import { FadeSlideIn } from 'react-native-animation-kit';

// Basic — slides up from 35px, fades in
<FadeSlideIn>
  <MyCard />
</FadeSlideIn>

// With delay and custom distance
<FadeSlideIn delay={200} distance={50}>
  <HeroSection />
</FadeSlideIn>

// Slide in from left
<FadeSlideIn direction="left" delay={160}>
  <SidePanel />
</FadeSlideIn>

// Staggered list
{items.map((item, i) => (
  <FadeSlideIn key={item.id} delay={i * 80}>
    <ItemCard item={item} />
  </FadeSlideIn>
))}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Start delay in ms |
| `duration` | `number` | `380` | Animation duration in ms |
| `distance` | `number` | `35` | Starting offset in px |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Slide direction |
| `style` | `object` | — | Additional container styles |

---

### FadeIn <a id="fadein"></a>

The lightest entrance. Pure opacity, no movement.

```tsx
import { FadeIn } from 'react-native-animation-kit';

<FadeIn delay={100}>
  <TooltipOverlay />
</FadeIn>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Start delay in ms |
| `duration` | `number` | `320` | Animation duration in ms |

---

### ZoomFadeIn <a id="zoomfadein"></a>

Scale + fade entrance. Feels modern and polished — great for modals and screen transitions.

```tsx
import { ZoomFadeIn } from 'react-native-animation-kit';

<ZoomFadeIn>
  <ModalContent />
</ZoomFadeIn>

// Subtle screen transition
<ZoomFadeIn fromScale={0.97} duration={250}>
  <ScreenView />
</ZoomFadeIn>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Start delay in ms |
| `duration` | `number` | `360` | Animation duration in ms |
| `fromScale` | `number` | `0.85` | Starting scale value |

---

### BounceIn <a id="bouncein"></a>

Spring-powered entrance with a natural bounce. More energetic than `FadeSlideIn` — use for success states, empty screens, and hero elements.

```tsx
import { BounceIn } from 'react-native-animation-kit';

<BounceIn>
  <SuccessIllustration />
</BounceIn>

// From below, delayed
<BounceIn direction="down" delay={120}>
  <BottomBanner />
</BounceIn>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Start delay in ms |
| `distance` | `number` | `60` | Starting offset in px |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Bounce direction |
| `friction` | `number` | `6` | Spring friction |
| `tension` | `number` | `60` | Spring tension |

---

### ScalePop <a id="scalepop"></a>

Grows from zero with a satisfying spring overshoot. Ideal for confirmation icons, badges, and FABs appearing on screen.

```tsx
import { ScalePop } from 'react-native-animation-kit';

<ScalePop>
  <SuccessIcon />
</ScalePop>

// Staggered badges
{badges.map((badge, i) => (
  <ScalePop key={badge.id} delay={i * 60}>
    <Badge label={badge.label} />
  </ScalePop>
))}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Start delay in ms |
| `friction` | `number` | `7` | Spring friction |
| `tension` | `number` | `80` | Spring tension |

---

### Pulse <a id="pulse"></a>

Looping scale pulse. Draws user attention without being distracting. Use for live indicators, notification dots, and CTAs.

```tsx
import { Pulse } from 'react-native-animation-kit';

// Live indicator dot
<Pulse>
  <View style={styles.dot} />
</Pulse>

// Gentle CTA pulse
<Pulse minScale={0.98} maxScale={1.02} duration={2000}>
  <PrimaryButton />
</Pulse>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `minScale` | `number` | `0.94` | Scale at breathe-out |
| `maxScale` | `number` | `1.06` | Scale at breathe-in |
| `duration` | `number` | `1400` | Full cycle duration in ms |
| `delay` | `number` | `0` | Start delay in ms |

---

### Spin <a id="spin"></a>

Continuous rotation. Wrap any icon or view — instant spinner.

```tsx
import { Spin } from 'react-native-animation-kit';

<Spin>
  <LoaderIcon size={24} />
</Spin>

// Slow, counter-clockwise
<Spin duration={2400} direction={-1}>
  <RefreshIcon />
</Spin>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `duration` | `number` | `900` | One full rotation in ms |
| `direction` | `1 \| -1` | `1` | `1` = clockwise, `-1` = counter-clockwise |

---

### LoopBounce <a id="loopbounce"></a>

Gentle vertical float loop. Use for scroll indicators, empty state illustrations, and floating CTAs.

```tsx
import { LoopBounce } from 'react-native-animation-kit';

// Scroll cue
<LoopBounce>
  <ChevronDownIcon />
</LoopBounce>

// Slow, subtle float
<LoopBounce height={6} duration={2000}>
  <FloatingCard />
</LoopBounce>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | `number` | `10` | Float distance in px |
| `duration` | `number` | `800` | Full cycle duration in ms |
| `delay` | `number` | `0` | Start delay in ms |
| `iterations` | `number` | `-1` | Repeat count. `-1` = infinite |

---

### PressScale <a id="pressscale"></a>

Drop-in replacement for `TouchableOpacity` with a more physical, premium press feel.

```tsx
import { PressScale } from 'react-native-animation-kit';

<PressScale onPress={handleSubmit}>
  <View style={styles.button}>
    <Text>Continue</Text>
  </View>
</PressScale>

// Subtle card press
<PressScale activeScale={0.97} onPress={() => nav.navigate('Detail')}>
  <Card />
</PressScale>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `onPress` | `function` | — | Press handler |
| `onLongPress` | `function` | — | Long press handler |
| `activeScale` | `number` | `0.95` | Scale when pressed |
| `disabled` | `boolean` | `false` | Disables interaction |

---

### Shake <a id="shake"></a>

Horizontal shake for error feedback. Triggered imperatively via ref — call `.shake()` whenever validation fails.

```tsx
import { Shake, ShakeRef } from 'react-native-animation-kit';

const shakeRef = useRef<ShakeRef>(null);

const handleLogin = async () => {
  const success = await login(email, password);
  if (!success) shakeRef.current?.shake();
};

<Shake ref={shakeRef}>
  <TextInput style={styles.input} />
</Shake>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `intensity` | `number` | `8` | Shake distance in px |
| `duration` | `number` | `480` | Total shake duration in ms |

**Ref methods:**

| Method | Description |
|---|---|
| `shake()` | Triggers the shake animation |

---

### Flip <a id="flip"></a>

3D card flip between two faces. Fully controlled via the `flipped` prop.

```tsx
import { Flip } from 'react-native-animation-kit';

const [flipped, setFlipped] = useState(false);

<TouchableOpacity onPress={() => setFlipped(f => !f)}>
  <Flip
    flipped={flipped}
    front={<QuestionCard />}
    back={<AnswerCard />}
  />
</TouchableOpacity>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `flipped` | `boolean` | `false` | Controls which face is shown |
| `front` | `ReactNode` | — | Front face content |
| `back` | `ReactNode` | — | Back face content |
| `duration` | `number` | `420` | Flip duration in ms |

---

### Stagger <a id="stagger"></a>

Wraps every child in a `FadeSlideIn` with automatically calculated stagger delays. The cleanest way to animate lists.

```tsx
import { Stagger } from 'react-native-animation-kit';

// Auto-staggers all children
<Stagger>
  <CardA />
  <CardB />
  <CardC />
</Stagger>

// Custom timing and direction
<Stagger stagger={60} direction="left" initialDelay={100}>
  {items.map(item => (
    <Item key={item.id} {...item} />
  ))}
</Stagger>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `stagger` | `number` | `80` | Delay between each child in ms |
| `initialDelay` | `number` | `0` | Delay before the first child |
| `duration` | `number` | `380` | Each item's animation duration |
| `distance` | `number` | `35` | Slide distance in px |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Slide direction |

---

### CountUp <a id="countup"></a>

Animated number counter. Counts from one value to another with an eased animation.

```tsx
import { CountUp } from 'react-native-animation-kit';

// Currency
<CountUp to={1240} prefix="$" />

// Percentage
<CountUp to={87} suffix="%" duration={900} />

// Decimals
<CountUp to={4.8} decimals={1} suffix=" stars" />

// Custom formatter
<CountUp
  to={48000}
  formatter={n => `${(n / 1000).toFixed(1)}k views`}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `to` | `number` | — | Target value **(required)** |
| `from` | `number` | `0` | Starting value |
| `duration` | `number` | `1000` | Animation duration in ms |
| `delay` | `number` | `0` | Start delay in ms |
| `decimals` | `number` | `0` | Decimal places |
| `prefix` | `string` | `''` | Text before the number e.g. `$` |
| `suffix` | `string` | `''` | Text after the number e.g. `%` |
| `formatter` | `(value: number) => string` | — | Custom format — overrides prefix/suffix/decimals |
| `style` | `TextStyle` | — | Text styles |

---

## Recipes

### FlatList with stagger

Cap the delay on long lists so items deep in the list don't wait too long:

```tsx
const renderItem = ({ item, index }) => (
  <FadeSlideIn delay={Math.min(index * 80, 400)}>
    <ItemCard item={item} />
  </FadeSlideIn>
);

<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
/>
```

---

### Screen transition

Wrap your screen content for a polished entry on every navigation:

```tsx
export default function ProfileScreen() {
  return (
    <FadeSlideIn duration={300}>
      <ScrollView>
        {/* screen content */}
      </ScrollView>
    </FadeSlideIn>
  );
}
```

---

### Success state

Combine `ScalePop` and `FadeSlideIn` for a satisfying confirmation screen:

```tsx
<View style={styles.center}>
  <ScalePop>
    <CheckCircleIcon size={64} color="#22c55e" />
  </ScalePop>

  <FadeSlideIn delay={200}>
    <Text style={styles.title}>Payment successful</Text>
  </FadeSlideIn>

  <FadeSlideIn delay={320}>
    <Text style={styles.subtitle}>Your order is on its way.</Text>
  </FadeSlideIn>
</View>
```

---

### Login error with shake

```tsx
const shakeRef = useRef<ShakeRef>(null);

const handleSubmit = async () => {
  const ok = await signIn(email, password);
  if (!ok) shakeRef.current?.shake();
};

<Shake ref={shakeRef}>
  <View style={styles.inputGroup}>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" secureTextEntry />
  </View>
</Shake>

<PressScale onPress={handleSubmit}>
  <View style={styles.button}>
    <Text>Sign in</Text>
  </View>
</PressScale>
```

---

### Dashboard stats

```tsx
<View style={styles.statsRow}>
  <ZoomFadeIn delay={0}>
    <StatCard label="Revenue">
      <CountUp to={24800} prefix="$" duration={1200} />
    </StatCard>
  </ZoomFadeIn>

  <ZoomFadeIn delay={100}>
    <StatCard label="Growth">
      <CountUp to={18} suffix="%" duration={1000} />
    </StatCard>
  </ZoomFadeIn>

  <ZoomFadeIn delay={200}>
    <StatCard label="Users">
      <CountUp to={4800} formatter={n => `${(n / 1000).toFixed(1)}k`} />
    </StatCard>
  </ZoomFadeIn>
</View>
```

---

## License

MIT © [Abu Hasnat Nobin](https://github.com/Tafsan-Mahmud)

---

<div align="center">
  <sub>If this helped you, consider giving it a ⭐ on GitHub</sub>
</div>