import React, { useContext } from 'react'
import { AlarmContext } from '../context/Alarm'
import './digitalClock.css'
import { format } from 'date-fns'

const DigitalClock = () => {
	const { hourDigital, minutesDigital, amPm, dayNow, monthNow, yearNow, hasAlarm, alarmTime, distanceUntilAlarm } =
		useContext(AlarmContext)

	return (
		<div>
			<div className="clock-text">
				<div className="clock-text-hour">{`${hourDigital}:`}</div>
				<div className="clock-text-minutes">{minutesDigital}</div>
				<div className="clock-text-ampm">{amPm}</div>
			</div>
			<div className="clock-date">
				<span>{`${dayNow} `}</span>
				<span>{`${monthNow} , `}</span>
				<span>{yearNow}</span>
			</div>

			{hasAlarm ? (
				<div className="clock-date">
					<h3>Alarm Time:</h3>
					<span>{format(alarmTime, 'h:mmaaa')}</span>
					<h3>Time remaining:</h3>
					<span>{distanceUntilAlarm}</span>
				</div>
			) : null}
		</div>
	)
}

export default DigitalClock
