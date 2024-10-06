from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

from flask_cors import CORS, cross_origin
cors = CORS(app)

# Load the datasets and train the model
dataset = pd.read_csv('Training.csv')
precautions_df = pd.read_csv('precautions_df.csv')
workout_df = pd.read_csv('workout_df.csv')
description_df = pd.read_csv('description.csv')
medications_df = pd.read_csv('medications.csv')
diets_df = pd.read_csv('diets.csv')

# Data preprocessing
X = dataset.drop('prognosis', axis=1)
y = dataset['prognosis']

le = LabelEncoder()
le.fit(y)
Y = le.transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=20)

# Train RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Route for diagnosis
@app.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.get_json()
    input_symptoms = data['symptoms']
    symptoms_list = input_symptoms.lower().replace(" ", "_").split(',')

    input_data = np.zeros(len(X.columns))
    for symptom in symptoms_list:
        if symptom in X.columns:
            input_data[X.columns.get_loc(symptom)] = 1

    input_data = input_data.reshape(1, -1)
    predicted_disease_encoded = rf.predict(input_data)[0]
    predicted_disease = le.inverse_transform([predicted_disease_encoded])[0]

    # Prepare the result
    result = {
        "diagnosis": predicted_disease,
        "precautions": precautions_df[precautions_df['Disease'] == predicted_disease].values[0][2:],
        "workout": workout_df[workout_df['disease'] == predicted_disease]['workout'].values[0],
        "description": description_df[description_df['Disease'] == predicted_disease]['Description'].values[0],
        "medication": medications_df[medications_df['Disease'] == predicted_disease]['Medication'].values[0],
        "diet": diets_df[diets_df['Disease'] == predicted_disease]['Diet'].values[0],
    }

    for k, v in result.items():
        result[k] = list(v)
    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
