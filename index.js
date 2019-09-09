import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Animated,
	Platform,
	StatusBar,
	TouchableOpacity,
	Dimensions
} from 'react-native';


const StatusBarAlert = (props) => {
	const [height,setHeight] = useState(new Animated.Value(0))
	const [opacity,setOpacity] = useState(new Animated.Value(0))
	const [pulse,setPulse] = useState(new Animated.Value(0))
	const [preVisible, setPreVisible] = useState(null);


	if (props.visible !== preVisible) {
		if (props.visible === true) {
			// Show alert
			requestAnimationFrame(() => {
				Animated.parallel([
					Animated.timing(height, {
						toValue:
							Platform.OS === 'ios'
								? props.height +
									(props.statusbarHeight || STATUS_BAR_HEIGHT)
								: props.height,
						duration: SLIDE_DURATION
					}),
					Animated.timing(opacity, {
						toValue: 1,
						duration: SLIDE_DURATION
					})
				]).start();
			});
		}
		if (props.visible === false) {
			// Hide alert
			requestAnimationFrame(() => {
				Animated.parallel([
					Animated.timing(height, {
						toValue: 0,
						duration: SLIDE_DURATION
					}),
					Animated.timing(opacity, {
						toValue: 0,
						duration: SLIDE_DURATION
					})
				]).start();
			});
		}

		setPreVisible(props.visible)
	}

	useEffect(() => {
		if (props.visible === true) {
			// Slide animation
			requestAnimationFrame(() => {
				Animated.parallel([
					Animated.timing(height, {
						toValue:
							Platform.OS === 'ios'
								? props.height +
									(props.statusbarHeight || STATUS_BAR_HEIGHT)
								: props.height,
						duration: SLIDE_DURATION
					}),
					Animated.timing(opacity, {
						toValue: 1,
						duration: SLIDE_DURATION
					})
				]).start();
			});
		}
		// Pulse animation
		const timer = setInterval(() => {
			if (props.pulse) {
				if (Math.round(pulse._value) === 1) {
					Animated.timing(pulse, {
						toValue: 0,
						duration: PULSE_DURATION
					}).start();
				} else {
					Animated.timing(pulse, {
						toValue: 1,
						duration: PULSE_DURATION
					}).start();
				}
			}
		}, PULSE_DURATION);

		return () => {
			clearInterval(timer)
		}
	},[])


	const content = props.children || (
		<Animated.Text
			style={[
				styles.text,
				{
					color: props.color || styles.text.color,
					opacity: props.pulse === 'text' ? pulse : 1
				}
			]}
			allowFontScaling={false}
		>
			{props.message}
		</Animated.Text>
	);
	return (
		<Animated.View
			style={[
				styles.view,
				props.style,
				{
					height: height,
					opacity: opacity,
					backgroundColor:
						props.pulse === 'background'
							? pulse.interpolate({
									inputRange: [0, 1],
									outputRange: [
										props.backgroundColor,
										props.highlightColor ||
											saturate(props.backgroundColor, SATURATION)
									]
								})
							: props.backgroundColor
				}
			]}
		>
			<TouchableOpacity
				style={[styles.touchableOpacity, props.style]}
				onPress={props.onPress || null}
				activeOpacity={ACTIVE_OPACITY}
			>
				{content}
			</TouchableOpacity>
		</Animated.View>
	);
}


const d = Dimensions.get("window");
const isX = Platform.OS === "ios" && (d.height > 800 || d.width > 800) ? true : false;
const iosStatusBarHeight = isX ? 30 : 20; // to prevent cut-off text on iPhone X devices 
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? iosStatusBarHeight : StatusBar.currentHeight;
const PULSE_DURATION = 1000;
const SLIDE_DURATION = 300;
const ACTIVE_OPACITY = 0.6;
const DEFAULT_BACKGROUND_COLOR = '#3DD84C';
const SATURATION = 0.9;

const styles = {
	view: {
		height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT * 2 : STATUS_BAR_HEIGHT,
		backgroundColor: saturate('#3DD84C', SATURATION)
	},
	touchableOpacity: {
		flex: 1,
		display: 'flex',
		height: STATUS_BAR_HEIGHT,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	text: {
		height: Platform.OS === 'ios' ? 20 : STATUS_BAR_HEIGHT,
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 20,
		marginBottom: Platform.OS === 'ios' ? 4 : 0,
		color: 'white'
	}
};

StatusBarAlert.propTypes = {
	visible: PropTypes.bool.isRequired,
	message: PropTypes.string,
	pulse: PropTypes.oneOf(['text', 'background', null, false]),
	backgroundColor: PropTypes.string,
	highlightColor: PropTypes.string,
	color: PropTypes.string,
	height: PropTypes.number,
	statusbarHeight: PropTypes.number,
	onPress: PropTypes.func,
	style: PropTypes.any
};

StatusBarAlert.defaultProps = {
	visible: false,
	message: '',
	pulse: false,
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	highlightColor: null,
	color: styles.text.color,
	height: STATUS_BAR_HEIGHT,
	statusbarHeight: STATUS_BAR_HEIGHT,
	onPress: null
};

function saturate(color, percent) {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);
	R = parseInt(R * percent);
	G = parseInt(G * percent);
	B = parseInt(B * percent);
	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;
	let r = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
	let g = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
	let b = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);
	return `#${r + g + b}`;
}

export default StatusBarAlert;
