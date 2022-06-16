import { View,Platform, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { colors } from '../utils/index'

export default function ReloadIcon({ load })  { //리로드 버튼 생성 및 활성화
  const ReloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
 
    return (
      <View style={styles.ReloadIcon}>
        <Ionicons onPress={ load } name={ReloadIconName} size={24} color={colors.PRIMARY_COLOR} />
      </View>
    )
  }

  const styles = StyleSheet.create({
    ReloadIcon : {
      position: 'absolute',
      top: 55,
      right: 20
    }
  })