require("dotenv").config();
import axios from "axios";

const actualsColExcludedFields = ["hospitalBeds", "hsaHospitalBeds"];
const dataExcludedFields = [
    "county",
    "hsa",
    "hsaName",
    "lat",
    "annotations",
    "long",
];

export const getCovidInfo = async () => {
    try {
        const response = await axios.get(
            `${process.env.COVID_API_URL}?apiKey=${process.env.COVID_API_KEY}`
        );

        for (const obj of response.data) {
            for (const key in obj) {
                if (key === "fips") {
                    obj["id"] = obj[key];
                    delete obj[key];
                }
                if (dataExcludedFields.includes(key)) {
                    delete obj[key];
                }
                if (key === "actuals") {
                    for (const actualsKey in obj[key]) {
                        if (actualsColExcludedFields.includes(actualsKey)) {
                            delete obj[key][actualsKey];
                        }
                    }
                }
            }
        }

        return response.data;
    } catch (error) {
        console.log("Fetch COVID data error: ", error);
        throw error;
    }
};
