import React, { createContext, useState } from 'react'
import months from '../constants/months'
import Sound from '../assets/mixkit-casino-win-alarm-and-coins-1990.mp3'
import { addMinutes, differenceInSeconds, formatDistance } from 'date-fns'
import useInterval from '../utils/useInterval'

const alarm = new Audio(Sound)
export const AlarmContext = createContext()

function Alarm({ children }) {
	const [hourDigital, setHourDigital] = useState('')
	const [minutesDigital, setMinutesDigital] = useState('')
	const [amPm, setAmPm] = useState('')
	const [dayNow, setDayNow] = useState('')
	const [monthNow, setMonthNow] = useState('')
	const [yearNow, setYearNow] = useState('')
	const [alarmTime, setAlarmTime] = useState()
	const [hasAlarm, setHasAlarm] = useState(false)

	const [distanceUntilAlarm, setDistanceUntilAlarm] = useState('')
	const [timeRemaining, setTimeRemaining] = useState('')

	const calculateAlarmTime = ({ pass, energy, alarmType }) => {
		let maxEnergy = 60
		let rechargeRateInMinutes = 6
		switch (pass) {
			case 'No Pass':
				maxEnergy = 40
				break
			case 'Premium':
				break
			case 'Legend':
				rechargeRateInMinutes = 3
				break
			default:
				throw new Error('Unknown Adventure Pass Type')
		}

		let targetEnergy
		switch (alarmType) {
			case '1-Run':
				targetEnergy = 10
				break
			case 'Arena':
				targetEnergy = 20
				break
			case 'Full':
				targetEnergy = maxEnergy
				break
			default:
				throw new Error('Unknown Alarm Type')
		}

		const minutes = (targetEnergy - Number(energy)) * rechargeRateInMinutes
		setAlarmTime(addMinutes(new Date(), minutes))
		setDistanceUntilAlarm(formatDistance(new Date(), alarmTime))
	}

	const calculateCoinRush = ({ pass }) => {
		const coinRushMinutes = pass === 'Legend' ? 2.5 : 5
		setAlarmTime(addMinutes(new Date(), coinRushMinutes))
		setDistanceUntilAlarm(formatDistance(new Date(), alarmTime))
	}

	useInterval(() => {
		let date = new Date()
		let HH = date.getHours()
		let MM = date.getMinutes()
		let day = date.getDate()
		let month = date.getMonth()
		let year = date.getFullYear()
		let ampm

		if (HH >= 12) {
			HH = HH - 12
			ampm = 'PM'
		} else {
			ampm = 'AM'
		}
		if (HH === 0) HH = 12
		if (HH < 10) HH = `0${HH}`
		if (MM < 10) MM = `0${MM}`

		setHourDigital(HH)
		setMinutesDigital(MM)
		setAmPm(ampm)
		setDayNow(day)
		setMonthNow(months[month])
		setYearNow(year)
		if (hasAlarm) {
			const now = new Date()
			const alarmDate = new Date(alarmTime)
			setTimeRemaining(differenceInSeconds(now, alarmDate))
			setDistanceUntilAlarm(formatDistance(now, alarmDate))
		}
	}, 1000)

	if (hasAlarm && timeRemaining > 0) {
		alarm.play()
		alarm.loop = true
	}
	const pauseAlarm = () => {
		alarm.pause()
		setAlarmTime('')
		setTimeRemaining('')
		setDistanceUntilAlarm('')
	}
	return (
		<AlarmContext.Provider
			value={{
				hourDigital,
				minutesDigital,
				amPm,
				dayNow,
				monthNow,
				yearNow,
				alarmTime,
				calculateAlarmTime,
				calculateCoinRush,
				distanceUntilAlarm,
				timeRemaining,
				pauseAlarm,
				hasAlarm,
				setHasAlarm,
			}}
		>
			{children}
		</AlarmContext.Provider>
	)
}

export default Alarm
