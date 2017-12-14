/**
 * Created by pradeetswamy on 12/12/17
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ART, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import Arc from '../shapes/Arc';
import withSpinAnimation from '../animations/withSpinAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const RNViewPropTypes = ViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 122, 255, 1)',
    fontSize: 32 / 4.5,
    fontWeight: '300',
  }
});

export class ProgressCircle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.progressValue = props.animated ? props.progress._value : props.progress;
  }

  componentWillMount() {
    if (this.props.animated) {
      this.props.progress.addListener((event) => {
        this.progressValue = event.value;
        if (this.props.showsText || this.progressValue === 1) {
          this.forceUpdate();
        }
      });
    }
  }

  render() {
    const {
      animated,
      borderColor,
      borderWidth,
      color,
      children,
      direction,
      formatText,
      indeterminate,
      progress,
      rotation,
      showsText,
      size,
      style,
      strokeCap,
      endAngle,
      textStyle,
      thickness,
      unfilledColor,
      ...restProps
    } = this.props;

    const border = borderWidth || (indeterminate ? 1 : 0);

    const radius = (size / 2) - border;
    const offset = {
      top: border,
      left: border,
    };
    const textOffset = border + thickness;
    const textSize = size - (textOffset * 2);

    const Surface = rotation ? AnimatedSurface : ART.Surface;
    const Shape = animated ? AnimatedArc : Arc;
    const progressValue = animated ? this.progressValue : progress;
    const angle = animated ? Animated.multiply(progress, CIRCLE) : progress * CIRCLE;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={{
            transform: [{
              rotate: indeterminate && rotation
                ? rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
                : '0deg',
            }],
          }}
        >
          {unfilledColor && progressValue !== 1 ? (
            <Shape
              radius={radius}
              offset={offset}
              startAngle={angle}
              endAngle={CIRCLE}
              direction={direction}
              stroke={unfilledColor}
              strokeWidth={thickness}
            />
          ) : false}
          {!indeterminate ? (
            <Shape
              radius={radius}
              offset={offset}
              startAngle={0}
              endAngle={angle}
              direction={direction}
              stroke={color}
              strokeCap={strokeCap}
              strokeWidth={thickness}
            />
          ) : false}
          {border ? (
            <Arc
              radius={size / 2}
              startAngle={0}
              endAngle={(indeterminate ? endAngle * 2 : 2) * Math.PI}
              stroke={borderColor || color}
              strokeCap={strokeCap}
              strokeWidth={border}
            />
          ) : false}
        </Surface>
        {!indeterminate && showsText ? (
          <View style={[styles.textContainer, {
            left: textOffset,
            top: textOffset,
            width: textSize,
            height: textSize,
            borderRadius: textSize / 2
          }]}
          >
            <Text style={[styles.text, { color, fontSize: textSize / 4.5 }, textStyle]}>{formatText(progressValue)}</Text>
          </View>
        ) : false}
        {children}
      </View>
    );
  }
}

ProgressCircle.propTypes = {
  animated: PropTypes.bool,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
  formatText: PropTypes.func,
  indeterminate: PropTypes.bool,
  progress: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Animated.Value),
  ]),
  rotation: PropTypes.instanceOf(Animated.Value),
  showsText: PropTypes.bool,
  size: PropTypes.number,
  style: RNViewPropTypes.style,
  textStyle: Text.propTypes.style,
  thickness: PropTypes.number,
  unfilledColor: PropTypes.string,
  strokeCap: PropTypes.string,
  endAngle: PropTypes.number
};

ProgressCircle.defaultProps = {
  borderWidth: 1,
  color: 'rgba(0, 122, 255, 1)',
  direction: 'clockwise',
  formatText: progress => `${Math.round(progress * 100)}%`,
  progress: 0,
  showsText: false,
  size: 40,
  thickness: 3,
  endAngle: 0.9,
};

module.exports = withSpinAnimation(ProgressCircle);
