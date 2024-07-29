import React, { useState } from 'react'
import axios from 'axios'
import { FaInfoCircle } from 'react-icons/fa' // Import the info icon

function DiabetesForm() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    smoking_history: '',
    bmi: '',
    HbA1c_level: '',
    blood_glucose_level: '',
  })
  const [prediction, setPrediction] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}
    const {
      gender,
      age,
      hypertension,
      heart_disease,
      smoking_history,
      bmi,
      HbA1c_level,
      blood_glucose_level,
    } = formData

    // Basic validation
    if (!gender) newErrors.gender = 'Gender is required'
    if (isNaN(age) || age < 0) newErrors.age = 'Age must be a positive number'
    if (!['0', '1'].includes(hypertension))
      newErrors.hypertension = 'Hypertension must be 0 or 1'
    if (!['0', '1'].includes(heart_disease))
      newErrors.heart_disease = 'Heart Disease must be 0 or 1'
    if (!smoking_history)
      newErrors.smoking_history = 'Smoking History is required'
    if (isNaN(bmi) || bmi <= 0) newErrors.bmi = 'BMI must be a positive number'
    if (isNaN(HbA1c_level) || HbA1c_level < 3.5 || HbA1c_level > 9)
      newErrors.HbA1c_level = 'HbA1c Level must be between 3.5 and 9'
    if (
      isNaN(blood_glucose_level) ||
      blood_glucose_level < 80 ||
      blood_glucose_level > 300
    )
      newErrors.blood_glucose_level =
        'Blood Glucose Level must be between 80 and 300'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setPrediction('')
    try {
      const dataToSend = {
        ...formData,
        age: Number(formData.age),
        hypertension: Number(formData.hypertension),
        heart_disease: Number(formData.heart_disease),
        bmi: Number(formData.bmi),
        HbA1c_level: Number(formData.HbA1c_level),
        blood_glucose_level: Number(formData.blood_glucose_level),
      }
      console.log('Sending data:', dataToSend)
      const response = await axios.post(
        'http://localhost:5000/predict_diabetes',
        dataToSend
      )
      console.log('Received response:', response.data)
      setPrediction(response.data.prediction_text)
    } catch (error) {
      console.error('Error making prediction', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      setPrediction('Error: Unable to make prediction')
    }
  }
  const getPredictionClass = (prediction) => {
    switch (prediction) {
      case 'Diabetic':
        return 'prediction-output diabetic'
      case 'Non-Diabetic':
        return 'prediction-output non-diabetic'
      default:
        return 'prediction-output info'
    }
  }

  return (
    <div>
      <h2>Diabetes Prediction</h2>
      <form onSubmit={handleSubmit}>
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
                formData.gender === 'Female' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='gender'
                value='Female'
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label
              className={`radio-button ${
                formData.gender === 'Male' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
          </div>
          {errors.gender && <p className='error'>{errors.gender}</p>}
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
            Hypertension
            <span
              className='info-icon'
              title='Indicate if the patient has hypertension (0: No, 1: Yes)'
            >
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.hypertension === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='hypertension'
                value='0'
                checked={formData.hypertension === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.hypertension === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='hypertension'
                value='1'
                checked={formData.hypertension === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.hypertension && (
            <p className='error'>{errors.hypertension}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Heart Disease
            <span
              className='info-icon'
              title='Indicate if the patient has heart disease (0: No, 1: Yes)'
            >
              <FaInfoCircle />
            </span>
          </label>
          <div className='radio-buttons'>
            <label
              className={`radio-button ${
                formData.heart_disease === '0' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='heart_disease'
                value='0'
                checked={formData.heart_disease === '0'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label
              className={`radio-button ${
                formData.heart_disease === '1' ? 'selected' : ''
              }`}
            >
              <input
                type='radio'
                name='heart_disease'
                value='1'
                checked={formData.heart_disease === '1'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
          </div>
          {errors.heart_disease && (
            <p className='error'>{errors.heart_disease}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Smoking History
            <span
              className='info-icon'
              title='Select the smoking history (e.g., Never, Not Current, Former)'
            >
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='smoking_history'
            value={formData.smoking_history}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Smoking History
            </option>
            <option value='never'>Never</option>
            <option value='not current'>Not current</option>
            <option value='former'>Former</option>
            <option value='ever'>Ever</option>
            <option value='No Info'>No Info</option>
          </select>
          {errors.smoking_history && (
            <p className='error'>{errors.smoking_history}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            BMI
            <span
              className='info-icon'
              title='Enter BMI (Body Mass Index). Normal range: 18.5 to 24.9'
            >
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='bmi'
            value={formData.bmi}
            onChange={handleChange}
            placeholder='BMI'
            required
          />
          {errors.bmi && <p className='error'>{errors.bmi}</p>}
        </div>

        <div className='form-group'>
          <label>
            HbA1c Level
            <span
              className='info-icon'
              title='Normal HbA1c Level: Below 5.7%. Range: 3.5 to 9'
            >
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='HbA1c_level'
            value={formData.HbA1c_level}
            onChange={handleChange}
            placeholder='HbA1c Level'
            required
          />
          {errors.HbA1c_level && <p className='error'>{errors.HbA1c_level}</p>}
        </div>

        <div className='form-group'>
          <label>
            Blood Glucose Level
            <span
              className='info-icon'
              title='Fasting blood sugar level: Less than 100 mg/dL (5.6 mmol/L) is normal. Range: 80 to 300 mg/dL'
            >
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='blood_glucose_level'
            value={formData.blood_glucose_level}
            onChange={handleChange}
            placeholder='Blood Glucose Level'
            required
          />
          {errors.blood_glucose_level && (
            <p className='error'>{errors.blood_glucose_level}</p>
          )}
        </div>

        <button type='submit'>Predict</button>
      </form>
      {prediction && (
        <div className={getPredictionClass(prediction)}>{prediction}</div>
      )}
    </div>
  )
}

export default DiabetesForm
