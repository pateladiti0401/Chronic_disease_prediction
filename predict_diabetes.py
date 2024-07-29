import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Function to preprocess and encode the diabetes dataset
def preprocess_diabetes_data(file_path):
    diabetes_data = pd.read_csv(file_path)

    # Encode categorical variables
    label_encoder = LabelEncoder()
    diabetes_data['gender'] = label_encoder.fit_transform(diabetes_data['gender'])
    diabetes_data['smoking_history'] = label_encoder.fit_transform(diabetes_data['smoking_history'])

    # Split the dataset into features and target variable
    X = diabetes_data.drop('diabetes', axis=1)
    y = diabetes_data['diabetes']
    return X, y

# Preprocess diabetes dataset
diabetes_file_path = 'diabetes_prediction_dataset.csv'
X_diabetes, y_diabetes = preprocess_diabetes_data(diabetes_file_path)

# Split the data into training and testing sets
X_train_diabetes, X_test_diabetes, y_train_diabetes, y_test_diabetes = train_test_split(X_diabetes, y_diabetes, test_size=0.2, random_state=42)

# Initialize the models for diabetes
diabetes_models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Random Forest': RandomForestClassifier(random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'Support Vector Machine': SVC(probability=True, random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier()
}

# Train and evaluate each model for diabetes
best_diabetes_model = None
best_diabetes_accuracy = 0
for name, model in diabetes_models.items():
    model.fit(X_train_diabetes, y_train_diabetes)
    y_pred = model.predict(X_test_diabetes)
    accuracy = accuracy_score(y_test_diabetes, y_pred)
    print(f"Diabetes - {name} Accuracy: {accuracy:.4f}")
    if accuracy > best_diabetes_accuracy:
        best_diabetes_accuracy = accuracy
        best_diabetes_model = model

# Save the best diabetes model to a .pkl file
diabetes_model_path = 'diabetes_prediction_model.pkl'
joblib.dump(best_diabetes_model, diabetes_model_path)
print(f"Best diabetes model saved to {diabetes_model_path}")
