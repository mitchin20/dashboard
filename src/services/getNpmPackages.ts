require("dotenv").config();
import axios from "axios";
import { getCache, setCache, hasCacheKey } from "../config/localCache";

const NPM_API = "https://api.npms.io/v2/package/mget";
const packageNames = ["react"];

export const getNpmPackages = async () => {
    try {
        const response = await axios.post(NPM_API, packageNames, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("NPM packages", response.data);
        return response.data;
    } catch (error) {
        console.log("Fetch NPM packages error: ", error);
        throw error;
    }
};
