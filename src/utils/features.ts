import axios from "axios";
import { generate } from "random-words";

export const generateWords = async (langParam: LangType) => {
    try{
        const words = generate(8);
        
        const wordsArray:string[] = Array.isArray(words) ? words : [words];
        
        const allWords = wordsArray.map((i) => {
            {
                Text: i
            }
        })
        
        console.log(allWords)
       const data = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', allWords, { params:{
        to: 'hi',
        'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain'
        }, headers:{
            'x-rapidapi-key': 'd913886486msh0e5bb4528a1030ep1c746fjsnd2bf77acf304',
            'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
            'Content-Type': 'application/json'
        }});

    }catch(error){
        console.log(error);
        throw new Error("Something went wrong");
    }


}