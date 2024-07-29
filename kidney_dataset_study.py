import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
file_path = '/content/chronic_kidney_disease_full.xlsx'
df = pd.read_excel(file_path)

# Display the head of the dataset
df.head()

df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

# Replace '?' with NaN
df.replace('?', np.nan, inplace=True)

# Convert appropriate columns to numerical types
columns_to_convert = ['age', 'bp', 'bgr', 'bu', 'sc', 'sod', 'pot', 'hemo', 'pcv', 'wbcc', 'rbcc']
df[columns_to_convert] = df[columns_to_convert].apply(pd.to_numeric)

# Fill missing values with mean for numerical columns and mode for categorical columns
df[columns_to_convert] = df[columns_to_convert].fillna(df[columns_to_convert].mean())
categorical_columns = df.select_dtypes(include=['object']).columns
for column in categorical_columns:
    df[column].fillna(df[column].mode()[0], inplace=True)


# 1. Distribution of ages
plt.figure(figsize=(10, 6))
sns.histplot(df['age'], kde=True, bins=30)
plt.title('Age Distribution')
plt.xlabel('Age')
plt.ylabel('Frequency')
plt.show()

# 2. Blood pressure distribution among patients
plt.figure(figsize=(10, 6))
sns.histplot(df['bp'], kde=True, bins=30)
plt.title('Blood Pressure Distribution')
plt.xlabel('Blood Pressure')
plt.ylabel('Frequency')
plt.show()

# 3. Relationship between blood sugar and the presence of diabetes
plt.figure(figsize=(10, 6))
sns.boxplot(x='dm', y='bgr', data=df)
plt.title('Blood Sugar Levels vs Diabetes')
plt.xlabel('Diabetes (dm)')
plt.ylabel('Blood Sugar (bgr)')
plt.show()

# 4. Proportion of patients with chronic kidney disease (CKD) and without CKD
plt.figure(figsize=(10, 6))
sns.countplot(x='class', data=df)
plt.title('Proportion of Patients with and without Chronic Kidney Disease')
plt.xlabel('Class')
plt.ylabel('Count')
plt.show()

# 5. Correlation heatmap for numerical features
plt.figure(figsize=(12, 8))
correlation_matrix = df[columns_to_convert].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Correlation Heatmap of Numerical Features')
plt.show()