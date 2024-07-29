import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Function to preprocess and encode the CKD dataset
def preprocess_ckd_data(df):
    # Replace '?' with NaN for proper handling of missing values
    df.replace('?', pd.NA, inplace=True)
    
    # Handle missing values: drop rows with missing target variable, fill others with median/mode
    df.dropna(subset=['class'], inplace=True)
    for column in df.columns:
        if df[column].dtype == 'object':
            df[column].fillna(df[column].mode()[0], inplace=True)
        else:
            df[column].fillna(df[column].median(), inplace=True)
    
    # Encode categorical variables
    label_encoder = LabelEncoder()
    for column in df.select_dtypes(include=['object']).columns:
        df[column] = label_encoder.fit_transform(df[column])
    
    # Split the dataset into features and target variable
    X = df.drop('class', axis=1)
    y = df['class']
    return X, y

# Load CKD dataset
ckd_file_path = 'chronic_kidney_disease_full.xlsx'
ckd_data = pd.read_excel(ckd_file_path)

# Preprocess CKD dataset
X_ckd, y_ckd = preprocess_ckd_data(ckd_data)

# Split the data into training and testing sets
X_train_ckd, X_test_ckd, y_train_ckd, y_test_ckd = train_test_split(X_ckd, y_ckd, test_size=0.2, random_state=42)

# Initialize the models for CKD
ckd_models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Random Forest': RandomForestClassifier(random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'Support Vector Machine': SVC(probability=True, random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier()
}

# Train and evaluate each model for CKD
best_ckd_model = None
best_ckd_accuracy = 0
for name, model in ckd_models.items():
    model.fit(X_train_ckd, y_train_ckd)
    y_pred = model.predict(X_test_ckd)
    accuracy = accuracy_score(y_test_ckd, y_pred)
    print(f"CKD - {name} Accuracy: {accuracy:.4f}")
    if accuracy > best_ckd_accuracy:
        best_ckd_accuracy = accuracy
        best_ckd_model = model

# Save the best CKD model to a .pkl file
ckd_model_path = 'ckd_prediction_model.pkl'
joblib.dump(best_ckd_model, ckd_model_path)
print(f"Best CKD model saved to {ckd_model_path}")
