import React, { useState } from 'react'
import axios from 'axios'
import { FaInfoCircle } from 'react-icons/fa' // Import the info icon

function KidneyForm() {
  const [formData, setFormData] = useState({
    age: '',
    blood_pressure: '',
    specific_gravity: '',
    albumin: '',
    sugar: '',
    red_blood_cells: '',
    pus_cell: '',
    pus_cell_clumps: '',
    bacteria: '',
    blood_glucose_random: '',
    blood_urea: '',
    serum_creatinine: '',
    sodium: '',
    potassium: '',
    hemoglobin: '',
    packed_cell_volume: '',
    white_blood_cell_count: '',
    red_blood_cell_count: '',
    hypertension: '',
    diabetes_mellitus: '',
    coronary_artery_disease: '',
    appetite: '',
    pedal_edema: '',
    anemia: '',
  })
  const [prediction, setPrediction] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const newErrors = {}
    const {
      age,
      blood_pressure,
      specific_gravity,
      albumin,
      sugar,
      red_blood_cells,
      pus_cell,
      pus_cell_clumps,
      bacteria,
      blood_glucose_random,
      blood_urea,
      serum_creatinine,
      sodium,
      potassium,
      hemoglobin,
      packed_cell_volume,
      white_blood_cell_count,
      red_blood_cell_count,
      hypertension,
      diabetes_mellitus,
      coronary_artery_disease,
      appetite,
      pedal_edema,
      anemia,
    } = formData

    // Basic validation
    if (isNaN(age) || age <= 0) newErrors.age = 'Age must be a positive number'
    if (isNaN(blood_pressure) || blood_pressure <= 0)
      newErrors.blood_pressure = 'Blood Pressure must be a positive number'
    if (isNaN(specific_gravity) || specific_gravity <= 0)
      newErrors.specific_gravity = 'Specific Gravity must be a positive number'
    if (isNaN(albumin) || albumin < 0)
      newErrors.albumin = 'Albumin must be a non-negative number'
    if (isNaN(sugar) || sugar < 0)
      newErrors.sugar = 'Sugar must be a non-negative number'
    if (!['Normal', 'Abnormal'].includes(red_blood_cells))
      newErrors.red_blood_cells = 'Red Blood Cells must be Normal or Abnormal'
    if (!['Normal', 'Abnormal'].includes(pus_cell))
      newErrors.pus_cell = 'Pus Cell must be Normal or Abnormal'
    if (!['present', 'notpresent'].includes(pus_cell_clumps))
      newErrors.pus_cell_clumps =
        'Pus Cell Clumps must be present or notpresent'
    if (!['present', 'notpresent'].includes(bacteria))
      newErrors.bacteria = 'Bacteria must be present or notpresent'
    if (isNaN(blood_glucose_random) || blood_glucose_random < 0)
      newErrors.blood_glucose_random =
        'Blood Glucose Random must be a non-negative number'
    if (isNaN(blood_urea) || blood_urea < 0)
      newErrors.blood_urea = 'Blood Urea must be a non-negative number'
    if (isNaN(serum_creatinine) || serum_creatinine < 0)
      newErrors.serum_creatinine =
        'Serum Creatinine must be a non-negative number'
    if (isNaN(sodium) || sodium < 0)
      newErrors.sodium = 'Sodium must be a non-negative number'
    if (isNaN(potassium) || potassium < 0)
      newErrors.potassium = 'Potassium must be a non-negative number'
    if (isNaN(hemoglobin) || hemoglobin < 0)
      newErrors.hemoglobin = 'Hemoglobin must be a non-negative number'
    if (isNaN(packed_cell_volume) || packed_cell_volume < 0)
      newErrors.packed_cell_volume =
        'Packed Cell Volume must be a non-negative number'
    if (isNaN(white_blood_cell_count) || white_blood_cell_count < 0)
      newErrors.white_blood_cell_count =
        'White Blood Cell Count must be a non-negative number'
    if (isNaN(red_blood_cell_count) || red_blood_cell_count < 0)
      newErrors.red_blood_cell_count =
        'Red Blood Cell Count must be a non-negative number'
    if (!['Yes', 'No'].includes(hypertension))
      newErrors.hypertension = 'Hypertension must be Yes or No'
    if (!['Yes', 'No'].includes(diabetes_mellitus))
      newErrors.diabetes_mellitus = 'Diabetes Mellitus must be Yes or No'
    if (!['Yes', 'No'].includes(coronary_artery_disease))
      newErrors.coronary_artery_disease =
        'Coronary Artery Disease must be Yes or No'
    if (!['Good', 'Poor'].includes(appetite))
      newErrors.appetite = 'Appetite must be Good or Poor'
    if (!['Yes', 'No'].includes(pedal_edema))
      newErrors.pedal_edema = 'Pedal Edema must be Yes or No'
    if (!['Yes', 'No'].includes(anemia))
      newErrors.anemia = 'Anemia must be Yes or No'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return // Stop submission if validation fails

    try {
      const response = await axios.post(
        'http://localhost:5000/predict_ckd',
        formData
      )
      setPrediction(response.data.prediction_text)
    } catch (error) {
      console.error('Error making prediction', error)
    }
  }

  const getPredictionClass = (prediction) => {
    switch (prediction) {
      case 'Chronic Kidney Disease':
        return 'prediction-output diabetic'
      case 'Not Chronic Kidney Disease':
        return 'prediction-output non-diabetic'
      default:
        return 'prediction-output info'
    }
  }

  return (
    <div>
      <h2>Chronic Kidney Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
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
            Blood Pressure
            <span className='info-icon' title='Enter blood pressure value'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='blood_pressure'
            value={formData.blood_pressure}
            onChange={handleChange}
            placeholder='Blood Pressure'
            required
          />
          {errors.blood_pressure && (
            <p className='error'>{errors.blood_pressure}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Specific Gravity
            <span className='info-icon' title='Enter specific gravity'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='specific_gravity'
            value={formData.specific_gravity}
            onChange={handleChange}
            placeholder='Specific Gravity'
            required
          />
          {errors.specific_gravity && (
            <p className='error'>{errors.specific_gravity}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Albumin
            <span className='info-icon' title='Enter albumin level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='albumin'
            value={formData.albumin}
            onChange={handleChange}
            placeholder='Albumin'
            required
          />
          {errors.albumin && <p className='error'>{errors.albumin}</p>}
        </div>

        <div className='form-group'>
          <label>
            Sugar
            <span className='info-icon' title='Enter sugar level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='sugar'
            value={formData.sugar}
            onChange={handleChange}
            placeholder='Sugar'
            required
          />
          {errors.sugar && <p className='error'>{errors.sugar}</p>}
        </div>

        <div className='form-group'>
          <label>
            Red Blood Cells
            <span className='info-icon' title='Select Red Blood Cells category'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='red_blood_cells'
            value={formData.red_blood_cells}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Red Blood Cells
            </option>
            <option value='Normal'>Normal</option>
            <option value='Abnormal'>Abnormal</option>
          </select>
          {errors.red_blood_cells && (
            <p className='error'>{errors.red_blood_cells}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Pus Cell
            <span className='info-icon' title='Select Pus Cell category'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='pus_cell'
            value={formData.pus_cell}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Pus Cell
            </option>
            <option value='Normal'>Normal</option>
            <option value='Abnormal'>Abnormal</option>
          </select>
          {errors.pus_cell && <p className='error'>{errors.pus_cell}</p>}
        </div>

        <div className='form-group'>
          <label>
            Pus Cell Clumps
            <span className='info-icon' title='Select Pus Cell Clumps category'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='pus_cell_clumps'
            value={formData.pus_cell_clumps}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Pus Cell Clumps
            </option>
            <option value='present'>Present</option>
            <option value='notpresent'>Not present</option>
          </select>
          {errors.pus_cell_clumps && (
            <p className='error'>{errors.pus_cell_clumps}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Bacteria
            <span className='info-icon' title='Select Bacteria category'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='bacteria'
            value={formData.bacteria}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Bacteria
            </option>
            <option value='present'>Present</option>
            <option value='notpresent'>Not present</option>
          </select>
          {errors.bacteria && <p className='error'>{errors.bacteria}</p>}
        </div>

        <div className='form-group'>
          <label>
            Blood Glucose Random
            <span
              className='info-icon'
              title='Enter Blood Glucose Random value'
            >
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='blood_glucose_random'
            value={formData.blood_glucose_random}
            onChange={handleChange}
            placeholder='Blood Glucose Random'
            required
          />
          {errors.blood_glucose_random && (
            <p className='error'>{errors.blood_glucose_random}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Blood Urea
            <span className='info-icon' title='Enter Blood Urea level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='blood_urea'
            value={formData.blood_urea}
            onChange={handleChange}
            placeholder='Blood Urea'
            required
          />
          {errors.blood_urea && <p className='error'>{errors.blood_urea}</p>}
        </div>

        <div className='form-group'>
          <label>
            Serum Creatinine
            <span className='info-icon' title='Enter Serum Creatinine level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='serum_creatinine'
            value={formData.serum_creatinine}
            onChange={handleChange}
            placeholder='Serum Creatinine'
            required
          />
          {errors.serum_creatinine && (
            <p className='error'>{errors.serum_creatinine}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Sodium
            <span className='info-icon' title='Enter Sodium level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='sodium'
            value={formData.sodium}
            onChange={handleChange}
            placeholder='Sodium'
            required
          />
          {errors.sodium && <p className='error'>{errors.sodium}</p>}
        </div>

        <div className='form-group'>
          <label>
            Potassium
            <span className='info-icon' title='Enter Potassium level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='potassium'
            value={formData.potassium}
            onChange={handleChange}
            placeholder='Potassium'
            required
          />
          {errors.potassium && <p className='error'>{errors.potassium}</p>}
        </div>

        <div className='form-group'>
          <label>
            Hemoglobin
            <span className='info-icon' title='Enter Hemoglobin level'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='hemoglobin'
            value={formData.hemoglobin}
            onChange={handleChange}
            placeholder='Hemoglobin'
            required
          />
          {errors.hemoglobin && <p className='error'>{errors.hemoglobin}</p>}
        </div>

        <div className='form-group'>
          <label>
            Packed Cell Volume
            <span className='info-icon' title='Enter Packed Cell Volume'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='packed_cell_volume'
            value={formData.packed_cell_volume}
            onChange={handleChange}
            placeholder='Packed Cell Volume'
            required
          />
          {errors.packed_cell_volume && (
            <p className='error'>{errors.packed_cell_volume}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            White Blood Cell Count
            <span className='info-icon' title='Enter White Blood Cell Count'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='white_blood_cell_count'
            value={formData.white_blood_cell_count}
            onChange={handleChange}
            placeholder='White Blood Cell Count'
            required
          />
          {errors.white_blood_cell_count && (
            <p className='error'>{errors.white_blood_cell_count}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Red Blood Cell Count
            <span className='info-icon' title='Enter Red Blood Cell Count'>
              <FaInfoCircle />
            </span>
          </label>
          <input
            type='number'
            name='red_blood_cell_count'
            value={formData.red_blood_cell_count}
            onChange={handleChange}
            placeholder='Red Blood Cell Count'
            required
          />
          {errors.red_blood_cell_count && (
            <p className='error'>{errors.red_blood_cell_count}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Hypertension
            <span className='info-icon' title='Select Hypertension status'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='hypertension'
            value={formData.hypertension}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Hypertension
            </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
          {errors.hypertension && (
            <p className='error'>{errors.hypertension}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Diabetes Mellitus
            <span className='info-icon' title='Select Diabetes Mellitus status'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='diabetes_mellitus'
            value={formData.diabetes_mellitus}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Diabetes Mellitus
            </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
          {errors.diabetes_mellitus && (
            <p className='error'>{errors.diabetes_mellitus}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Coronary Artery Disease
            <span
              className='info-icon'
              title='Select Coronary Artery Disease status'
            >
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='coronary_artery_disease'
            value={formData.coronary_artery_disease}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Coronary Artery Disease
            </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
          {errors.coronary_artery_disease && (
            <p className='error'>{errors.coronary_artery_disease}</p>
          )}
        </div>

        <div className='form-group'>
          <label>
            Appetite
            <span className='info-icon' title='Select Appetite status'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='appetite'
            value={formData.appetite}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Appetite
            </option>
            <option value='Good'>Good</option>
            <option value='Poor'>Poor</option>
          </select>
          {errors.appetite && <p className='error'>{errors.appetite}</p>}
        </div>

        <div className='form-group'>
          <label>
            Pedal Edema
            <span className='info-icon' title='Select Pedal Edema status'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='pedal_edema'
            value={formData.pedal_edema}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Pedal Edema
            </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
          {errors.pedal_edema && <p className='error'>{errors.pedal_edema}</p>}
        </div>

        <div className='form-group'>
          <label>
            Anemia
            <span className='info-icon' title='Select Anemia status'>
              <FaInfoCircle />
            </span>
          </label>
          <select
            name='anemia'
            value={formData.anemia}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              Select Anemia
            </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
          {errors.anemia && <p className='error'>{errors.anemia}</p>}
        </div>

        <button type='submit'>Predict</button>
      </form>
      {prediction && (
        <p className={getPredictionClass(prediction)}>{prediction}</p>
      )}
    </div>
  )
}

export default KidneyForm
