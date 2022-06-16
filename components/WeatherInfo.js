import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/index';

const {PRIMARY_COLOR, SECONADRY_COLOR, } = colors


export default function WeatherInfo({ currentWeather }) {
    const { main: { temp }, weather: [details], name } = currentWeather // 현재 온도에 대한 훅
    const { icon, main, description } = details // 디테일 부분에 대한 아이콘, 메이느 설명란 훅

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png` // 주소api(날씨 그림표시)

    return (// 화면단 표출 시 보여줄 페이지 구성
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.texSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    weatherDescription: {
        textTransform: 'capitalize',
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    texSecondary: {
        fontSize: 20,
        color: SECONADRY_COLOR,
        fontWeight: '500',
        marginTop: 10 
    }
})