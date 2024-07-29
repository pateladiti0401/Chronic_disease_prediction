from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained models
diabetes_model = joblib.load('diabetes_prediction_model.pkl')
heart_model, heart_features = joblib.load('best_model2.pkl')
ckd_model = joblib.load('ckd_prediction_model.pkl')

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    try:
        # Get data from the request
        data = request.json
        gender = data['gender']
        age = float(data['age'])
        hypertension = int(data['hypertension'])
        heart_disease = int(data['heart_disease'])
        smoking_history = data['smoking_history']
        bmi = float(data['bmi'])
        HbA1c_level = float(data['HbA1c_level'])
        blood_glucose_level = int(data['blood_glucose_level'])

        # Encode gender and smoking_history
        gender = 1 if gender.lower() == 'male' else 0
        smoking_history_dict = {'never': 0, 'formerly': 1, 'current': 2, 'ever': 3, 'not current': 4, 'no info': 5}
        smoking_history = smoking_history_dict.get(smoking_history.lower(), -1)

        # Create the input array
        input_features = np.array([[gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]])

        # Make prediction
        prediction = diabetes_model.predict(input_features)

        # Return result as JSON
        result = 'Diabetic' if prediction[0] == 1 else 'Not Diabetic'
        return jsonify(prediction_text=f'The prediction is: {result}')
    except Exception as e:
        return jsonify(prediction_text=f'Error: {str(e)}')

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    try:
        # Get data from the request
        data = request.json
        male = 1 if data['male'].lower() == 'male' else 0
        age = float(data['age'])
        education = float(data['education'])
        currentSmoker = int(data['currentSmoker'])
        cigsPerDay = float(data['cigsPerDay'])
        BPMeds = float(data['BPMeds'])
        prevalentStroke = int(data['prevalentStroke'])
        prevalentHyp = int(data['prevalentHyp'])
        diabetes = int(data['diabetes'])
        totChol = float(data['totChol'])
        sysBP = float(data['sysBP'])
        diaBP = float(data['diaBP'])
        BMI = float(data['BMI'])
        heartRate = float(data['heartRate'])
        glucose = float(data['glucose'])

        # Create the input array with the correct feature names
        input_data = {
            'male': male,
            'age': age,
            'education': education,
            'currentSmoker': currentSmoker,
            'cigsPerDay': cigsPerDay,
            'BPMeds': BPMeds,
            'prevalentStroke': prevalentStroke,
            'prevalentHyp': prevalentHyp,
            'diabetes': diabetes,
            'totChol': totChol,
            'sysBP': sysBP,
            'diaBP': diaBP,
            'BMI': BMI,
            'heartRate': heartRate,
            'glucose': glucose
        }
        input_df = pd.DataFrame([input_data], columns=heart_features)

 # Logging the input data
        print(f"Input Data: {input_df}")

        # Make prediction
        prediction = heart_model.predict(input_df)

        # Logging the prediction
        print(f"Prediction: {prediction}")

        # Return result as JSON
        result = 'At risk of CHD' if prediction[0] == 1 else 'Not at risk of CHD'
        return jsonify(prediction_text=f'The prediction is: {result}')
    except Exception as e:
        return jsonify(prediction_text=f'Error: {str(e)}')
@app.route('/predict_ckd', methods=['POST'])
def predict_ckd():
    try:
        # Get data from the request
        data = request.json
        age = float(data['age'])
        blood_pressure = float(data['blood_pressure'])
        specific_gravity = float(data['specific_gravity'])
        albumin = float(data['albumin'])
        sugar = float(data['sugar'])
        red_blood_cells = data['red_blood_cells']
        pus_cell = data['pus_cell']
        pus_cell_clumps = data['pus_cell_clumps']
        bacteria = data['bacteria']
        blood_glucose_random = float(data['blood_glucose_random'])
        blood_urea = float(data['blood_urea'])
        serum_creatinine = float(data['serum_creatinine'])
        sodium = float(data['sodium'])
        potassium = float(data['potassium'])
        hemoglobin = float(data['hemoglobin'])
        packed_cell_volume = float(data['packed_cell_volume'])
        white_blood_cell_count = float(data['white_blood_cell_count'])
        red_blood_cell_count = float(data['red_blood_cell_count'])
        hypertension = data['hypertension']
        diabetes_mellitus = data['diabetes_mellitus']
        coronary_artery_disease = data['coronary_artery_disease']
        appetite = data['appetite']
        pedal_edema = data['pedal_edema']
        anemia = data['anemia']

        # Encode categorical variables
        red_blood_cells = 1 if red_blood_cells.lower() == 'normal' else 0
        pus_cell = 1 if pus_cell.lower() == 'normal' else 0
        pus_cell_clumps = 1 if pus_cell_clumps.lower() == 'present' else 0
        bacteria = 1 if bacteria.lower() == 'present' else 0
        hypertension = 1 if hypertension.lower() == 'yes' else 0
        diabetes_mellitus = 1 if diabetes_mellitus.lower() == 'yes' else 0
        coronary_artery_disease = 1 if coronary_artery_disease.lower() == 'yes' else 0
        appetite = 1 if appetite.lower() == 'good' else 0
        pedal_edema = 1 if pedal_edema.lower() == 'yes' else 0
        anemia = 1 if anemia.lower() == 'yes' else 0

        # Create the input array
        input_features = np.array([[
            age, blood_pressure, specific_gravity, albumin, sugar,
            red_blood_cells, pus_cell, pus_cell_clumps, bacteria,
            blood_glucose_random, blood_urea, serum_creatinine, sodium,
            potassium, hemoglobin, packed_cell_volume, white_blood_cell_count,
            red_blood_cell_count, hypertension, diabetes_mellitus,
            coronary_artery_disease, appetite, pedal_edema, anemia
        ]])

        # Make prediction
        prediction = ckd_model.predict(input_features)

        # Return result as JSON
        result = 'Chronic Kidney Disease' if prediction[0] == 1 else 'No Chronic Kidney Disease'
        return jsonify(prediction_text=f'The prediction is: {result}')
    except Exception as e:
        return jsonify(prediction_text=f'Error: {str(e)}')

if __name__ == "__main__":
    app.run(debug=True)