/**
 * Created by pradeetswamy on 11/12/17
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

export default function withAnimation(WrappedComponent) {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class AnimatedComponent extends React.Component {
    static displayName = `withSpinAnimation(${wrappedComponentName})`;

    constructor(props) {
      super(props);

      this.progressValue = Math.min(Math.max(props.progress, 0), 1);
      this.rotationValue = 0;
      this.state = {
        progress: new Animated.Value(this.progressValue),
        rotation: new Animated.Value(this.rotationValue),
      };
    }

    componentDidMount() {
      this.state.progress.addListener((event) => { this.progressValue = event.value; });
      this.state.rotation.addListener((event) => { this.rotationValue = event.value; });
      if (this.props.indeterminate) {
        this.spin();
      }
    }

    componentWillReceiveProps(props) {
      if (props.indeterminate !== this.props.indeterminate) {
        if (props.indeterminate) {
          this.spin();
        } else {
          Animated.spring(this.state.rotation, {
            toValue: (this.rotationValue > 0.5 ? 1 : 0),
          }).start((endState) => {
            if (endState.finished) {
              this.state.rotation.setValue(0);
            }
          });
        }
      }

      const progress = props.indeterminate ? 0 : Math.min(Math.max(props.progress, 0), 1);

      if (progress !== this.progressValue) {
        if (props.animated) {
          Animated.spring(this.state.progress, {
            toValue: progress,
            bounciness: 0,
          }).start();
        } else {
          this.state.progress.setValue(progress);
        }
      }
    }

    componentWillUnmount() {
      this.state.progress.removeAllListeners();
      this.state.rotation.removeAllListeners();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          progress={this.props.animated ? this.state.progress : this.props.progress}
          rotation={this.state.rotation}
        />
      );
    }

    spin() {
      this.state.rotation.setValue(0);
      Animated.timing(this.state.rotation, {
        toValue: this.props.direction === 'counter-clockwise' ? -1 : 1,
        duration: 1000,
        easing: Easing.linear,
        isInteraction: false,
      }).start((endState) => {
        if (endState.finished) {
          this.spin();
        }
      });
    }
  }

  AnimatedComponent.propTypes = {
    animated: PropTypes.bool,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
    indeterminate: PropTypes.bool,
    progress: PropTypes.number.isRequired,
  };

  AnimatedComponent.defaultProps = {
    animated: true,
    indeterminate: false,
    progress: 0,
  };

  return AnimatedComponent;
}
