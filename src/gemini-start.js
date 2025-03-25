import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();
const API_KEY="AIzaSyASORHXl-kPxtGNAnFnF9MB_GVo1G3zR7k";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function run(dish){
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const prompt = `Give me recipe of ${dish} in a list format`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // console.log(response);
    const text = response.text();
    // console.log(text);
    return text;    

}
// run('samosa');