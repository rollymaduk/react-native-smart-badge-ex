/*
 * A smart badge for react-native apps
 * https://github.com/react-native-component/react-native-smart-badge/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    color: '#007aff',
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    backgroundColor: 'transparent',
    fontSize: 14,
    textAlign: 'center',         //for android
    textAlignVertical: 'center', //for android
  },
})

export default class Badge extends Component {

  static defaultProps = {
    extraPaddingHorizontal: 10,
  }

  static PropTypes = {
      //borderRadius: PropTypes.number,   //number 18, null 5
      extraPaddingHorizontal: PropTypes.number,
      style: View.propTypes.style,
      textStyle: Text.propTypes.style,
  }

  // 构造
    constructor(props) {
      super(props)
      // 初始状态
      this.state = {}

      this._width = 0
    }

  render() {
    return (
      <View ref={ component => this._container = component } style={[styles.container, this.props.style]}>
          {this._renderChildren()}
      </View>
    )
  }

  _renderChildren() {
      return React.Children.map(this.props.children, (child) => {
          if(!React.isValidElement(child)) {
              return (
                 <Text onLayout={this._onLayout} style={[styles.text, this.props.textStyle]}>{child}</Text>
              )
          }
          else {
            return child
          }
      })
  }

  _onLayout = (e) => {
    console.log('_onLayout')
    let width

    if(e.nativeEvent.layout.width <= e.nativeEvent.layout.height) {
      width = e.nativeEvent.layout.height
    }
    else {
      width = e.nativeEvent.layout.width + this.props.extraPaddingHorizontal
    }
    if(this._width == width) {
      return
    }
    this._width = width
    this._container.setNativeProps({
      style: {
        width: width,
        height: e.nativeEvent.layout.height,
        borderRadius: e.nativeEvent.layout.height / 2,
      },
    });
  }

}