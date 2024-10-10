require("dotenv").config();
import axios from "axios";

export const getStateMetricsTimeseries = async (state: string) => {
    try {
        const response = await axios.get(
            `${process.env.STATE_HISTORICAL_API_URL}/${state}.timeseries.json?apiKey=${process.env.COVID_API_KEY}`
        );

        console.log(
            "response.data.metricsTimeseries.length: ",
            response.data.metricsTimeseries.length
        );

        const lastSixMonthsData = response.data.metricsTimeseries.filter(
            ({ date }: { date: string }) => {
                return (
                    new Date(date) >=
                    new Date(new Date().setMonth(new Date().getMonth() - 12))
                );
            }
        );

        return {
            data: lastSixMonthsData,
            length: lastSixMonthsData.length,
        };
    } catch (error) {
        console.log("Fetch COVID data error: ", error);
        throw error;
    }
};
