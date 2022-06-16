import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { colors } from './utils/index';

const WEATHER_API_KEY = '29771442d46ba588e96fdf9477af81a4' //키값 조심
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?' //날씨 정보 가져올 주소

export default function App() { // 구동시 기능

  const [errorMessage, setErrorMessage] = useState(null) //에러메세지 훅
  const [currentWeather, setCurrentWeather] = useState(null) // 현재 온도 가져올 훅
  const [unitsSystem, setUnitsSystem] = useState('metric') //유닛? (실온도 가져올 데이터 처리)

  useEffect(() =>{ // 로드 가져올 훅 설정 (유닛 시스템이 섭씨 화씨 데이터 값 확인)
    load()
  }, [unitsSystem])

  async function load(){ // 로딩 함수
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') { //에러가 날때
        setErrorMessage('Access to location is needed to run the app')
        return
    }
    const location = await Location.getCurrentPositionAsync() // 위치를 위성에서 가져오기

    const {latitude, longitude} = location.coords // 현재위치 따오기

    const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}` //위치에 따른 온도정보

    const response = await fetch(weatherUrl) // api 정보의 함수 생성

    const result = await response.json() // 항시 결과 값은 제이슨 으로 처리

    if(response.ok){
      setCurrentWeather(result)
    }else{
      setErrorMessage(result.message)
    }

    }catch(error){
      setErrorMessage(error.message)
    }
  }

  if(currentWeather){
    
    return (// 웨더인포에서 정보 수집 즉,데이터 받은후 구성폴더에서 웨더인포로 리덕스 처리 & 섭씨 화씨 처리(피커처리) & 리로드 버튼 추가
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} /> 
        
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    )} else if (errorMessage) {
      return (
        <View style={styles.container}>
          <ReloadIcon load={load} />
          <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
      )
    
  } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator  size="large" />
          <StatusBar style="auto" color={colors.PRIMARY_COLOR} />
        </View>
      )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
