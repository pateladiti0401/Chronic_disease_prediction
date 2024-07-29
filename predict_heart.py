import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB
from sklearn.impute import SimpleImputer
import joblib

# Function to preprocess and encode the dataset
def preprocess_data(file_path):
    data = pd.read_csv(file_path)
    
    # Handle missing values
    # Separate numerical and categorical columns
    numerical_cols = data.select_dtypes(include=['float64', 'int64']).columns
    categorical_cols = data.select_dtypes(include=['object', 'bool']).columns

    # Convert boolean columns to integers
    for col in data.select_dtypes(include=['bool']).columns:
        data[col] = data[col].astype(int)
    
    # Impute missing values in numerical columns with the mean
    imputer_num = SimpleImputer(strategy='mean')
    data[numerical_cols] = imputer_num.fit_transform(data[numerical_cols])
    
    # Only process categorical columns if they exist
    if len(categorical_cols) > 0:
        # Convert categorical columns to string type for imputation
        for col in categorical_cols:
            data[col] = data[col].astype(str)
        
        # Impute missing values in categorical columns with the most frequent value
        imputer_cat = SimpleImputer(strategy='most_frequent')
        data[categorical_cols] = imputer_cat.fit_transform(data[categorical_cols])
        
        # Encode categorical variables
        label_encoder = LabelEncoder()
        for column in categorical_cols:
            data[column] = label_encoder.fit_transform(data[column])
    
    # Ensure the correct target variable column name
    target_column = 'TenYearCHD'  # This matches your dataset
    
    if target_column not in data.columns:
        raise ValueError(f"Column '{target_column}' not found in dataset")
    
    # Split the dataset into features and target variable
    X = data.drop(target_column, axis=1)
    y = data[target_column]
    return X, y

# Preprocess dataset
file_path = 'framingham_heart_disease.csv'
X, y = preprocess_data(file_path)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the models
models = {
    'Logistic Regression': LogisticRegression(max_iter=5000),
    'Random Forest': RandomForestClassifier(random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'Support Vector Machine': SVC(probability=True, random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier(),
    'Naive Bayes': GaussianNB()
}

# Train and evaluate each model
best_model = None
best_accuracy = 0
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"{name} Accuracy: {accuracy:.4f}")
    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

# Save the best model to a .pkl file
model_path = 'best_model2.pkl'
joblib.dump((best_model, X.columns.tolist()), model_path)
print(f"Best model saved to {model_path}")