/// <reference types="vite/client" />

type LangType = "ja" | "hi" | "es" |"fr";

type WordType = {
    word: string,
    meaning: string,
    options: string[]
}

interface stateType{
    loading: boolean;
    result: string[];
    words: WordType[];
    error?: string
}