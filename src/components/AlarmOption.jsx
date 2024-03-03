import React, { useContext } from 'react'
import useSelect from '../hooks/useSelect'
import { AlarmContext } from '../context/Alarm'
import './alarmOption.css'
import { energyNumber } from '../utils/fixNumber'

const adventurePasses = ['No Pass', 'Premium', 'Legend']
const alarmTypes = ['1-Run', 'Arena', 'Full']

const AlarmOption = () => {
	const [pass, setPass] = useSelect('Premium')
	const [energy, setEnergy] = useSelect('Energy')
	const [alarmType, setAlarmType] = useSelect('Full')
	const alarmContext = useContext(AlarmContext)
	const { hasAlarm, pauseAlarm, setHasAlarm, calculateAlarmTime, calculateCoinRush } = alarmContext

	const handleClearAlarm = () => {
		pauseAlarm()
		setHasAlarm(false)
	}
	const handleCalculateAlarm = () => {
		setHasAlarm(true)
		calculateAlarmTime({ pass, energy, alarmType })
	}
	const handleCoinRushAlarm = () => {
		setHasAlarm(true)
		calculateCoinRush({ pass })
	}

	return (
		<div className="option-container">
			{/* <pre>{JSON.stringify({ ...alarmContext, pass, energy, alarmType }, null, 2)}</pre> */}
			<div className={`wrapper-option ${hasAlarm && 'disable'}`}>
				<select {...setPass}>
					{adventurePasses.map((pass, index) => (
						<option key={index} value={pass}>
							{pass}
						</option>
					))}
				</select>
				<select {...setEnergy}>
					<option disabled value="Energy">
						Energy
					</option>
					{energyNumber.map((energy, index) => (
						<option key={index} value={energy}>
							{energy}
						</option>
					))}
				</select>
				<select {...setAlarmType}>
					{alarmTypes.map((pass, index) => (
						<option key={index} value={pass}>
							{pass}
						</option>
					))}
				</select>
			</div>
			{hasAlarm ? (
				<button onClick={handleClearAlarm} className="setAlarm-btn play">
					{'Clear Alarm'}
				</button>
			) : (
				<>
					<button
						disabled={energy === 'Energy'}
						onClick={handleCalculateAlarm}
						className={`setAlarm-btn ${energy === 'Energy' && 'disable'}`}
					>
						{'Calculate Alarm'}
					</button>
					<button onClick={handleCoinRushAlarm} className="setAlarm-btn">
						{'Coin Rush Alarm'}
					</button>
				</>
			)}
		</div>
	)
}

export default AlarmOption
