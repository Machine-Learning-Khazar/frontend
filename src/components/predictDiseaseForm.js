import React from "react";
import axios from 'axios';
import './diseasePredictor.css';


const BASE_URL = "https://x5w0n1tt-8000.euw.devtunnels.ms"

export default class DiseaseForm extends React.Component {

    state = {
        result: {}
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ result: {} });

        const data = {
            "age": parseInt(event.target.age.value),
            "blood_pressure": parseInt(event.target.blood_pressure.value),
            "albumin": parseInt(event.target.albumin.value),
            "pus_cellc_cumps": event.target.pus_cellc_cumps.value === "yes" ? 1 : 0,
            "bacteria": event.target.bacteria.value === "yes" ? 1 : 0,
            "blood_glucose_rand": parseInt(event.target.blood_glucose_rand.value),
            "blood_urea": parseInt(event.target.blood_urea.value),
            "serum_creatinine": parseInt(event.target.serum_creatinine.value),
            "hypertension": event.target.hypertension.value === "yes" ? 1 : 0,
            "diabetes_mellitus": event.target.diabetes_mellitus.value === "yes" ? 1 : 0,
            "caronory_artery_disease": event.target.caronory_artery_disease.value === "yes" ? 1 : 0,
            "appetite": event.target.appetite.value === "yes" ? 1 : 0,
            "pedal_edema": event.target.pedal_edema.value === "yes" ? 1 : 0,
            "anemia": event.target.anemia.valu === "yes" ? 1 : 0
        }
        axios.post(`${BASE_URL}/api/v1/diseases`, data)
            .then(res => {
                this.setState({ result: res.data });
            }).catch(error => {
                console.log(error);
            }
            );
    }

    render() {
        if (this.state.result.has_disease !== undefined) {
            console.log(this.state.result);
            return <div className="result-container">
                <h2 className="result-title">Result</h2>
                <p className={this.state.result.has_disease ? 'result-has-disease' : 'result-no-disease'}>
                    Has disease: {this.state.result.has_disease ? 'Yes' : 'No'}
                </p>
                <p className="result-certanity">
                    Certanity: {(this.state.result.certanity * 100).toFixed(2)}%
                </p>
                <button className="reset-button" onClick={() => this.setState({ result: {} })}>
                    Reset
                </button>
            </div>
        }
        return <div className="disease-predictor-container">
            <h1>Disease Predictor</h1>
            <form onSubmit={this.handleSubmit}>
                <label title="Patient's Age">
                    Age:
                    <input type="number" name="age" min="0" max="100" /> <br />
                </label>
                <label title="Patient's Blood Pressure. Between 50 and 200">
                    Blood Pressure:
                    <input type="number" name="blood_pressure" min="50" max="200" /> <br />
                </label>
                <label title="Patient's Albumin. Between 0 and 5">
                    Albumin:
                    <input type="number" name="albumin" min="0" max="5" /> <br />
                </label>
                <label title="Patient's Pus Cell Cumps">
                    Pus Cell Cumps:
                    <input type="radio" name="pus_cellc_cumps" value="yes" /> Yes
                    <input type="radio" name="pus_cellc_cumps" value="no" /> No <br />
                </label>
                <label title="Patient's Bacteria">
                    Bacteria:
                    <input type="radio" name="bacteria" value="yes" /> Yes
                    <input type="radio" name="bacteria" value="no" /> No <br />
                </label>
                <label title="Patient's Blood Glucose Random. Between 0 and 500">
                    Blood Glucose Random:
                    <input type="number" name="blood_glucose_rand" min="0" max="500" /> <br />
                </label>
                <label title="Patient's Blood Urea. Between 0 and 400">
                    Blood Urea:
                    <input type="number" name="blood_urea" min="0" max="400" /> <br />
                </label>
                <label title="Patient's Serum Creatinine. Between 0 and 60">
                    Serum Creatinine:
                    <input type="number" name="serum_creatinine" min="0" max="60" /> <br />
                </label>
                <label title="Patient's Hypertension">
                    Hypertension:
                    <input type="radio" name="hypertension" value="yes" /> Yes
                    <input type="radio" name="hypertension" value="no" /> No <br />
                </label>
                <label title="Patient's Diabetes Mellitus">
                    Diabetes Mellitus:
                    <input type="radio" name="diabetes_mellitus" value="yes" /> Yes
                    <input type="radio" name="diabetes_mellitus" value="no" /> No <br />
                </label>
                <label title="Patient's Caronory Artery Disease">
                    Caronory Artery Disease:
                    <input type="radio" name="caronory_artery_disease" value="yes" /> Yes
                    <input type="radio" name="caronory_artery_disease" value="no" /> No <br />
                </label>
                <label title="Patient's Appetite">
                    Appetite:
                    <input type="radio" name="appetite" value="yes" /> Yes
                    <input type="radio" name="appetite" value="no" /> No <br />
                </label>
                <label title="Patient's Pedal Edema">
                    Pedal Edema:
                    <input type="radio" name="pedal_edema" value="yes" /> Yes
                    <input type="radio" name="pedal_edema" value="no" /> No <br />
                </label>
                <label title="Patient's Anemia">
                    Anemia:
                    <input type="radio" name="anemia" value="yes" /> Yes
                    <input type="radio" name="anemia" value="no" /> No <br />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
            ;
    }
}
