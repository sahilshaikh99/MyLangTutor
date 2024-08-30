import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (words: { Text: string }[], index: number):string[] =>  {
    const correctAnswer: string = words[index].Text;
    const incorrectOption = words.filter((i) => i.Text !== correctAnswer);
    const otherOptions: string[] = _.sampleSize(incorrectOption, 3).map((i) => i.Text);

    const finalOptions: string[] = _.shuffle([...otherOptions, correctAnswer]);
    return finalOptions;
}

export const generateWords = async (langParam: LangType): Promise<WordType[]> => {
    try{
        const words = generate(8);
        
        const wordsArray:string[] = Array.isArray(words) ? words : [words];
        
        const allWords = await wordsArray.map((i) => {
            return {
                Text: i
            }
        })
        
       const data = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', allWords, { params:{
        to: langParam,
        'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain'
        }, headers:{
            'x-rapidapi-key': 'd913886486msh0e5bb4528a1030ep1c746fjsnd2bf77acf304',
            'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
            'Content-Type': 'application/json'
        }});
        console.log(data);

        const fetchedData: FetchDataType[] = data.data;
        const finalData:WordType[] = fetchedData.map((i, index) => {
            const options = generateOptions(allWords, index); 
            return {
                word: i.translations[0].text,
                meaning: words[index],
                options: options
            }
        }) 

        return finalData;
        }catch(error){
            console.log(error);
            throw new Error("Something went wrong");
        }

}

export const matchResult = (arr1: string[], arr2: string[]):number => {
    if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");

    let matchCount:number = 0;

    for(let i=0; i<arr1.length; i++){
        if(arr1[i] == arr2[i]) matchCount++;
    }
return matchCount;
}