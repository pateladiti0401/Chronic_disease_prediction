import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Load the dataset
file_path = '/content/framingham_heart_disease.csv'
df_heart = pd.read_csv(file_path)

missing_values_heart = df_heart.isnull().sum()

# Fill missing values with mean for numerical columns and mode for categorical columns
df_heart['education'].fillna(df_heart['education'].mode()[0], inplace=True)
numerical_columns = ['cigsPerDay', 'BPMeds', 'totChol', 'BMI', 'heartRate', 'glucose']
df_heart[numerical_columns] = df_heart[numerical_columns].fillna(df_heart[numerical_columns].mean())


plt.figure(figsize=(12, 8))
correlation_matrix_heart = df_heart.corr()
sns.heatmap(correlation_matrix_heart, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Correlation Heatmap of Heart Disease Dataset Features')
plt.show()


# 1. Histogram of Age Distribution by Gender
plt.figure(figsize=(10, 6))
sns.histplot(data=df_heart, x='age', hue='male', multiple='stack', kde=True)
plt.title('Age Distribution by Gender')
plt.xlabel('Age')
plt.ylabel('Frequency')
plt.legend(title='Gender', labels=['Female', 'Male'])
plt.show()


# 2. Boxplot of Systolic Blood Pressure by Smoking Status
plt.figure(figsize=(10, 6))
sns.boxplot(x='currentSmoker', y='sysBP', data=df_heart)
plt.title('Systolic Blood Pressure by Smoking Status')
plt.xlabel('Current Smoker')
plt.ylabel('Systolic Blood Pressure')
plt.xticks([0, 1], ['Non-Smoker', 'Smoker'])
plt.show()
 # 3. Violin Plot of BMI by Diabetes Status
plt.figure(figsize=(10, 6))
sns.violinplot(x='diabetes', y='BMI', data=df_heart)
plt.title('BMI by Diabetes Status')
plt.xlabel('Diabetes')
plt.ylabel('BMI')
plt.xticks([0, 1], ['No Diabetes', 'Diabetes'])
plt.show()
 # 4. Count Plot of Ten-Year CHD Risk by Gender
plt.figure(figsize=(10, 6))
sns.countplot(x='TenYearCHD', hue='male', data=df_heart)
plt.title('Ten-Year CHD Risk by Gender')
plt.xlabel('Ten-Year CHD Risk')
plt.ylabel('Count')
plt.legend(title='Gender', labels=['Female', 'Male'])
plt.show()
plt.figure(figsize=(10, 6))
sns.scatterplot(x='age', y='totChol', hue='TenYearCHD', data=df_heart, palette='coolwarm')
plt.title('Age vs. Total Cholesterol Colored by Ten-Year CHD Risk')
plt.xlabel('Age')
plt.ylabel('Total Cholesterol')
plt.show()