require("dotenv").config();
import axios from "axios";

export const getStateMetricsTimeseries = async (state: string) => {
    try {
        const response = await axios.get(
            `${process.env.STATE_HISTORICAL_API_URL}/${state}.timeseries.json?apiKey=${process.env.COVID_API_KEY}`
        );

        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }

        // Clean up data
        const cleanData = response.data.actualsTimeseries.map((item: any) => {
            return {
                date: item.date,
                cases: item.cases,
                deaths: item.deaths,
                newCases: item.newCases,
                newDeaths: item.newDeaths,
            };
        });

        return {
            data: cleanData,
            length: cleanData.length ?? 0,
        };
    } catch (error) {
        console.log("Fetch COVID data error: ", error);
        throw error;
    }
};
