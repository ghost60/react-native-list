import React, { Component } from 'react'
import { Dimensions, TouchableOpacity, Image, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

// 根据dp获取屏幕的px
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

/*
设计图标准 750 * 1334
*/
const designWidth = 750.0;
const designHeight = 1334.0;
function scaleSize(size) {
  var scaleWidth = SCREEN_WIDTH / designWidth;
  var scaleHeight = SCREEN_HEIGHT / designHeight;
  var scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5));
  return size;
}

export default class List extends Component {
  render() {
    const { options, dataSource, avator, arrow, underLine, style } = this.props
    const { left, right, avatorUri, onPress } = options

    let leftcallback = null
    if (left != null && typeof left === 'object') {
      if (Array.isArray(left.key)) {
        let key = []
        for (let i = 0; i < left.key.length; i++) {
          key.push(left.key[i])
        }
        leftcallback = (item) => {
          let items = []
          for (let i = 0; i < key.length; i++) {
            items.push(item[key[i]])
          }
          return items
        }
      } else {
        let key = left.key
        leftcallback = (item) => {
          let items = []
          return items.push(item[key])
        }
      }
    }
    let rightcallback = null
    if (right != null && typeof right === 'object') {
      if (Array.isArray(right.key)) {
        let key = []
        for (let i = 0; i < right.key.length; i++) {
          key.push(right.key[i])
        }
        rightcallback = (item) => {
          let items = []
          for (let i = 0; i < key.length; i++) {
            items.push(item[key[i]])
          }
          return items
        }
      } else {
        let key = right.key
        rightcallback = (item) => {
          let items = []
          items.push(item[key])
          return items
        }
      }
    }
    let height = avator ? { height: scaleSize(128) } : null
    return (
      <View style={style}>
        {
          dataSource.map((item, index) => {
            let cUnderline = null
            let dUnderLine = null
            if (underLine && index < dataSource.length - 1) {
              if (avator) {
                dUnderLine = { borderBottomColor: Color_Border, borderBottomWidth: 1 }
              } else {
                cUnderline = { borderBottomColor: Color_Border, borderBottomWidth: 1 }
              }
            }
            let _onPress = onPress ? () => onPress.func(item[onPress.key]) : () => { }
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                onPress={_onPress}
                style={[{ minHeight: 48, paddingHorizontal: scaleSize(20), flexDirection: 'row', alignItems: 'center' }, { ...cUnderline }]}
              >
                {
                  avator &&
                  <View style={{ height: scaleSize(128), paddingVertical: scaleSize(5) }}>
                    <Image style={{ width: scaleSize(118), height: scaleSize(118), borderRadius: 4, marginRight: 8 }} source={item[avatorUri]} />
                  </View>
                }
                <View style={[{ ...height }, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, { ...dUnderLine }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                      left != null && typeof left === 'object' ? left.render(...leftcallback(item)) : <Text style={{ fontSize: scaleSize(30), color: '#333333' }}>{item[left]}</Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                      right != null && typeof right === 'object' ? right.render(...rightcallback(item)) : <Text style={{ fontSize: scaleSize(30), color: '#333333', marginRight: 8 }}>{item[right]}</Text>
                    }
                    {
                      arrow &&
                      <Icon name="ios-arrow-forward" size={22} color="#666666" />
                    }
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }
}

List.propTypes = {
  options: PropTypes.object,
  dataList: PropTypes.array,
  avator: PropTypes.bool,
  underLine: PropTypes.bool,
}
List.defaultProps = {
  options: {
    left: '',
    right: '',
  },
  avator: false,
  arrow: true,
  underLine: true,
  dataList: [],
};