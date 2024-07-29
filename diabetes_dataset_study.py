import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# Load the dataset
file_path = 'diabetes_prediction_dataset.csv'
data = pd.read_csv(file_path)

# Encode the 'gender' and 'smoking_history' columns
data['gender'] = LabelEncoder().fit_transform(data['gender'])
data['smoking_history'] = LabelEncoder().fit_transform(data['smoking_history'])

# Data Exploration
print(data.head())
print(data.isnull().sum())
print(data.dtypes)

# Data Visualization
data.hist(figsize=(12, 10))
plt.show()

plt.figure(figsize=(10, 8))
sns.heatmap(data.corr(), annot=True)
plt.show()

data['gender'] = data['gender'].map({0: 'Female', 1: 'Male'})

# Creating a count plot
plt.figure(figsize=(8, 6))
sns.countplot(x='gender', hue='diabetes', data=data)
plt.title('Diabetes Count by Gender')
plt.xlabel('Gender')
plt.ylabel('Count')
plt.legend(title='Diabetes', labels=['Non-diabetic', 'Diabetic'])
plt.show()