// import React, { useState } from 'react'
// import axios from 'axios'
// import { FaInfoCircle } from 'react-icons/fa' // Import the info icon

// function HeartForm() {
//   const [formData, setFormData] = useState({
//     age: '',
//     sex: '',
//     resting_bp: '',
//     cholesterol: '',
//     fasting_bs: '',
//     resting_ecg: '',
//     max_hr: '',
//     exercise_angina: '',
//     oldpeak: '',
//     st_slope: '',
//   })
//   const [prediction, setPrediction] = useState('')
//   const [errors, setErrors] = useState({})

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     const {
//       age,
//       sex,
//       resting_bp,
//       cholesterol,
//       fasting_bs,
//       resting_ecg,
//       max_hr,
//       exercise_angina,
//       oldpeak,
//       st_slope,
//     } = formData

//     // Basic validation
//     if (isNaN(age) || age <= 0) newErrors.age = 'Age must be a positive number'
//     if (!['F', 'M'].includes(sex)) newErrors.sex = 'Sex must be F or M'
//     if (isNaN(resting_bp) || resting_bp <= 0)
//       newErrors.resting_bp = 'Resting BP must be a positive number'
//     if (isNaN(cholesterol) || cholesterol <= 0)
//       newErrors.cholesterol = 'Cholesterol must be a positive number'
//     if (!['0', '1'].includes(fasting_bs))
//       newErrors.fasting_bs = 'Fasting BS must be 0 or 1'
//     if (!['Normal', 'ST', 'LVH'].includes(resting_ecg))
//       newErrors.resting_ecg = 'Resting ECG must be Normal, ST, or LVH'
//     if (isNaN(max_hr) || max_hr <= 0)
//       newErrors.max_hr = 'Max HR must be a positive number'
//     if (!['Y', 'N'].includes(exercise_angina))
//       newErrors.exercise_angina = 'Exercise Angina must be Y or N'
//     if (isNaN(oldpeak) || oldpeak < 0)
//       newErrors.oldpeak = 'Oldpeak must be a non-negative number'
//     if (!['UP', 'DOWN', 'FLAT'].includes(st_slope))
//       newErrors.st_slope = 'ST Slope must be UP, DOWN, or FLAT'

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const getRestingBPCategory = (value) => {
//     // This function maps numeric values to their respective categories
//     if (value === '0') return 'Normal'
//     if (value === '1') return 'ST'
//     if (value === '2') return 'LVH'
//     return ''
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return // Stop submission if validation fails

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/predict_heart',
//         formData
//       )
//       setPrediction(response.data.prediction_text)
//     } catch (error) {
//       console.error('Error making prediction', error)
//     }
//   }
//   const getPredictionClass = (prediction) => {
//     switch (prediction) {
//       case 'Diabetic':
//         return 'prediction-output diabetic'
//       case 'Non-Diabetic':
//         return 'prediction-output non-diabetic'
//       default:
//         return 'prediction-output info'
//     }
//   }
//   return (
//     <div>
//       <h2>Heart Disease Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='form-group'>
//           <label>
//             Sex
//             <span className='info-icon' title='Select Sex (Male or Female)'>
//               <FaInfoCircle />
//             </span>
//           </label>
//           <div className='radio-buttons'>
//             <label
//               className={`radio-button ${
//                 formData.sex === 'F' ? 'selected' : ''
//               }`}
//             >
//               <input
//                 type='radio'
//                 name='sex'
//                 value='F'
//                 checked={formData.sex === 'F'}
//                 onChange={handleChange}
//                 required
//               />
//               Female
//             </label>
//             <label
//               className={`radio-button ${
//                 formData.sex === 'M' ? 'selected' : ''
//               }`}
//             >
//               <input
//                 type='radio'
//                 name='sex'
//                 value='M'
//                 checked={formData.sex === 'M'}
//                 onChange={handleChange}
//                 required
//               />
//               Male
//             </label>
//           </div>
//           {errors.sex && <p className='error'>{errors.sex}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Age
//             <span className='info-icon' title='Enter age in years'>
//               <FaInfoCircle />
//             </span>
//           </label>
//           <input
//             type='number'
//             name='age'
//             value={formData.age}
//             onChange={handleChange}
//             placeholder='Age'
//             required
//           />
//           {errors.age && <p className='error'>{errors.age}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Resting BP
//             <span
//               className='info-icon'
//               title='Normal resting blood pressure is between 60 and 100 beats per minute (BPM)'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <input
//             type='number'
//             name='resting_bp'
//             value={formData.resting_bp}
//             onChange={handleChange}
//             placeholder='Resting BP'
//             required
//           />
//           {errors.resting_bp && <p className='error'>{errors.resting_bp}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Cholesterol
//             <span className='info-icon' title='Enter cholesterol level'>
//               <FaInfoCircle />
//             </span>
//           </label>
//           <input
//             type='number'
//             name='cholesterol'
//             value={formData.cholesterol}
//             onChange={handleChange}
//             placeholder='Cholesterol'
//             required
//           />
//           {errors.cholesterol && <p className='error'>{errors.cholesterol}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Fasting BS
//             <span
//               className='info-icon'
//               title='Fasting blood sugar > 120 mg/dl (1=true; 0=false)'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <select
//             name='fasting_bs'
//             value={formData.fasting_bs}
//             onChange={handleChange}
//             required
//           >
//             <option value='' disabled>
//               Select Fasting BS
//             </option>
//             <option value='0'>False</option>
//             <option value='1'>True</option>
//           </select>
//           {errors.fasting_bs && <p className='error'>{errors.fasting_bs}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Resting ECG
//             <span
//               className='info-icon'
//               title='Select resting electrocardiogram result'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <select
//             name='resting_ecg'
//             value={formData.resting_ecg}
//             onChange={handleChange}
//             required
//           >
//             <option value='' disabled>
//               Select Resting ECG
//             </option>
//             <option value='Normal'>Normal</option>
//             <option value='ST'>ST</option>
//             <option value='LVH'>LVH</option>
//           </select>
//           {errors.resting_ecg && <p className='error'>{errors.resting_ecg}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Max HR
//             <span className='info-icon' title='Enter maximum heart rate'>
//               <FaInfoCircle />
//             </span>
//           </label>
//           <input
//             type='number'
//             name='max_hr'
//             value={formData.max_hr}
//             onChange={handleChange}
//             placeholder='Max HR'
//             required
//           />
//           {errors.max_hr && <p className='error'>{errors.max_hr}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             Exercise Angina
//             <span
//               className='info-icon'
//               title='Indicate exercise-induced angina (Y/N)'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <select
//             name='exercise_angina'
//             value={formData.exercise_angina}
//             onChange={handleChange}
//             required
//           >
//             <option value='' disabled>
//               Select Exercise Angina
//             </option>
//             <option value='Y'>Yes</option>
//             <option value='N'>No</option>
//           </select>
//           {errors.exercise_angina && (
//             <p className='error'>{errors.exercise_angina}</p>
//           )}
//         </div>

//         <div className='form-group'>
//           <label>
//             Oldpeak
//             <span
//               className='info-icon'
//               title='ST depression induced by exercise relative to rest'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <input
//             type='number'
//             name='oldpeak'
//             value={formData.oldpeak}
//             onChange={handleChange}
//             placeholder='Oldpeak'
//             required
//           />
//           {errors.oldpeak && <p className='error'>{errors.oldpeak}</p>}
//         </div>

//         <div className='form-group'>
//           <label>
//             ST Slope
//             <span
//               className='info-icon'
//               title='Select slope of the peak exercise ST segment'
//             >
//               <FaInfoCircle />
//             </span>
//           </label>
//           <select
//             name='st_slope'
//             value={formData.st_slope}
//             onChange={handleChange}
//             required
//           >
//             <option value='' disabled>
//               Select ST Slope
//             </option>
//             <option value='UP'>Up</option>
//             <option value='DOWN'>Down</option>
//             <option value='FLAT'>Flat</option>
//           </select>
//           {errors.st_slope && <p className='error'>{errors.st_slope}</p>}
//         </div>

//         <button type='submit'>Predict</button>
//       </form>
//       {prediction && (
//         <div className={getPredictionClass(prediction)}>{prediction}</div>
//       )}
//     </div>
//   )
// }

// export default HeartForm

import React, { useState } from 'react'
import axios from 'axios'
import { FaInfoCircle } from 'react-icons/fa' // Import the info icon

function HeartForm() {
  const [formData, setFormData] = useState({
    male: '',
    age: '',
    education: '',
    currentSmoker: '',
    cigsPerDay: '',
    BPMeds: '',
    prevalentStroke: '',
    prevalentHyp: '',
    diabetes: '',
    totChol: '',
    sysBP: '',
    diaBP: '',
    BMI: '',
    heartRate: '',
    glucose: '',
  })
  const [prediction, setPrediction] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const newErrors = {}
    const {
      male,
      age,
      education,
      currentSmoker,
      cigsPerDay,
      BPMeds,
      prevalentStroke,
      prevalentHyp,
      diabetes,
      totChol,
      sysBP,
      diaBP,
      BMI,
      heartRate,
      glucose,
    } = formData

    // Basic validation
    if (!['0', '1'].includes(male))
      newErrors.male = 'Gender must be Female or Male'
    if (isNaN(age) || age <= 0) newErrors.age = 'Age must be a positive number'
    if (isNaN(education) || education < 0)
      newErrors.education = 'Education must be a non-negative number'
    if (!['0', '1'].includes(currentSmoker))
      newErrors.currentSmoker = 'Current Smoker must be 0 or 1'
    if (isNaN(cigsPerDay) || cigsPerDay < 0)
      newErrors.cigsPerDay = 'Cigs Per Day must be a non-negative number'
    if (isNaN(BPMeds) || BPMeds < 0)
      newErrors.BPMeds = 'BP Meds must be a non-negative number'
    if (!['0', '1'].includes(prevalentStroke))
      newErrors.prevalentStroke = 'Prevalent Stroke must be 0 or 1'
    if (!['0', '1'].includes(prevalentHyp))
      newErrors.prevalentHyp = 'Prevalent Hyp must be 0 or 1'
    if (!['0', '1'].includes(diabetes))
      newErrors.diabetes = 'Diabetes must be 0 or 1'
    if (isNaN(totChol) || totChol <= 0)
      newErrors.totChol = 'Total Cholesterol must be a positive number'
    if (isNaN(sysBP) || sysBP <= 0)
      newErrors.sysBP = 'Systolic BP must be a positive number'
    if (isNaN(diaBP) || diaBP <= 0)
      newErrors.diaBP = 'Diastolic BP must be a positive number'
    if (isNaN(BMI) || BMI <= 0) newErrors.BMI = 'BMI must be a positive number'
    if (isNaN(heartRate) || heartRate <= 0)
      newErrors.heartRate = 'Heart Rate must be a positive number'
    if (isNaN(glucose) || glucose <= 0)
      newErrors.glucose = 'Glucose must be a positive number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return // Stop submission if validation fails

    try {
      const response = await axios.post(
        'http://localhost:5000/predict_heart',
        formData
      )
      setPrediction(response.data.prediction_text)
    } catch (error) {
      console.error('Error making prediction', error)
    }
  }

  const getPredictionClass = (prediction) => {
    switch (prediction) {
      case 'Heart Disease':
        return 'prediction-output heart-disease'
      case 'No Heart Disease':
        return 'prediction-output no-heart-disease'
      default:
        return 'prediction-output info'
    }
  }

  return (
    <div>
      <h2>Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className='form-group'>
          <label>
            Gender
            <span className='info-icon' title='Select Gender'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='male'
            value={formData.male}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Gender
            </option>
            <option value='0'>Female</option>
            <option value='1'>Male</option>
          </select>
          {errors.male && <p className='error'>{errors.male}</p>}
        </div> */}

        <div className='form-group'>
          <label>
            Gender
            <span className='info-icon' title='Select Gender (Male or Female)'>
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.male === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='male'
                value='0'
                checked={formData.male === '0'}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label
              className={`radio-button ${
                formData.male === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='male'
                value='1'
                checked={formData.male === '1'}
                onChange={handleChange}
                required
              />
              Male
            </label>
          </div>
          {errors.male && <p className='error'>{errors.male}</p>}
        </div>

        <div className='form-group'>
          <label>
            Age
            <span className='info-icon' title='Enter age in years'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='age'
            value={formData.age}
            onChange={handleChange}
            placeholder='Age'
            required
          />
          {errors.age && <p className='error'>{errors.age}</p>}
        </div>

        <div className='form-group'>
          <label>
            Education
            <span className='info-icon' title='Enter education level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='education'
            value={formData.education}
            onChange={handleChange}
            placeholder='Education'
            required
          />
          {errors.education && <p className='error'>{errors.education}</p>}
        </div>

        <div className='form-group'>
          <label>
            Current Smoker
            <span className='info-icon' title='Select Current Smoker'>
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.currentSmoker === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='currentSmoker'
                value='0'
                checked={formData.currentSmoker === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.currentSmoker === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='currentSmoker'
                value='1'
                checked={formData.currentSmoker === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.currentSmoker && (
            <p className='error'>{errors.currentSmoker}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Cigs Per Day
            <span className='info-icon' title='Enter cigarettes per day'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='cigsPerDay'
            value={formData.cigsPerDay}
            onChange={handleChange}
            placeholder='Cigs Per Day'
            required
          />
          {errors.cigsPerDay && <p className='error'>{errors.cigsPerDay}</p>}
        </div>

        <div className='form-group'>
          <label>
            BP Medications
            <span className='info-icon' title='Select BP Meds (No or Yes)'>
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.BPMeds === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='BPMeds'
                value='0'
                checked={formData.BPMeds === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.BPMeds === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='BPMeds'
                value='1'
                checked={formData.BPMeds === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.BPMeds && <p className='error'>{errors.BPMeds}</p>}
        </div>

        <div className='form-group'>
          <label>
            Prevalent Stroke
            <span
              className='info-icon'
              title='Having systolic BP ≥140 mmHg, diastolic BP ≥90 mmHg, or taking medication for hypertension'
            >
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.prevalentStroke === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='prevalentStroke'
                value='0'
                checked={formData.prevalentStroke === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.prevalentStroke === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='prevalentStroke'
                value='1'
                checked={formData.prevalentStroke === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.prevalentStroke && (
            <p className='error'>{errors.prevalentStroke}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Prevalent Hypertension
            <span
              className='info-icon'
              title='Having systolic BP ≥140 mmHg, diastolic BP ≥90 mmHg, or taking medication for hypertension'
            >
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.prevalentHyp === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='prevalentHyp'
                value='0'
                checked={formData.prevalentHyp === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.prevalentHyp === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='prevalentHyp'
                value='1'
                checked={formData.prevalentHyp === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.prevalentHyp && (
            <p className='error'>{errors.prevalentHyp}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Diabetes
            <span className='info-icon' title='Select Diabetes (No or Yes)'>
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.diabetes === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='diabetes'
                value='0'
                checked={formData.diabetes === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.diabetes === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='diabetes'
                value='1'
                checked={formData.diabetes === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.diabetes && <p className='error'>{errors.diabetes}</p>}
        </div>

        <div className='form-group'>
          <label>
            Total Cholesterol
            <span className='info-icon' title='Enter total cholesterol'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='totChol'
            value={formData.totChol}
            onChange={handleChange}
            placeholder='Total Cholesterol'
            required
          />
          {errors.totChol && <p className='error'>{errors.totChol}</p>}
        </div>

        <div className='form-group'>
          <label>
            Systolic BP
            <span className='info-icon' title='Enter systolic blood pressure'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='sysBP'
            value={formData.sysBP}
            onChange={handleChange}
            placeholder='Systolic BP'
            required
          />
          {errors.sysBP && <p className='error'>{errors.sysBP}</p>}
        </div>

        <div className='form-group'>
          <label>
            Diastolic BP
            <span className='info-icon' title='Enter diastolic blood pressure'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='diaBP'
            value={formData.diaBP}
            onChange={handleChange}
            placeholder='Diastolic BP'
            required
          />
          {errors.diaBP && <p className='error'>{errors.diaBP}</p>}
        </div>

        <div className='form-group'>
          <label>
            BMI
            <span className='info-icon' title='Enter body mass index'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='BMI'
            value={formData.BMI}
            onChange={handleChange}
            placeholder='BMI'
            required
          />
          {errors.BMI && <p className='error'>{errors.BMI}</p>}
        </div>

        <div className='form-group'>
          <label>
            Heart Rate
            <span className='info-icon' title='Enter heart rate'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='heartRate'
            value={formData.heartRate}
            onChange={handleChange}
            placeholder='Heart Rate'
            required
          />
          {errors.heartRate && <p className='error'>{errors.heartRate}</p>}
        </div>

        <div className='form-group'>
          <label>
            Glucose
            <span className='info-icon' title='Enter glucose level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='glucose'
            value={formData.glucose}
            onChange={handleChange}
            placeholder='Glucose'
            required
          />
          {errors.glucose && <p className='error'>{errors.glucose}</p>}
        </div>

        <button type='submit'>Predict</button>
      </form>
      {prediction && (
        <div className={getPredictionClass(prediction)}>{prediction}</div>
      )}
    </div>
  )
}

export default HeartForm
