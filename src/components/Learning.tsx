import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import { generateWords } from "../utils/features";
import { useDispatch } from "react-redux";
import { clearState, getWordsError, getWordsRequest, getWordsSuccess } from "../redux/slices";
import { useSelector } from 'react-redux';
import Loader from "./Loader";

//Learning Page
const Learning = () => {
    const [count, setCount] = useState<number>(0);
    const params = useSearchParams()[0].get("language") as LangType;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, words} = useSelector((state: {root : stateType}) => state.root); 
    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
    }

    useEffect(() => {
        dispatch(getWordsRequest());
        generateWords(params).then((data) => {
            console.log(data);
            dispatch(getWordsSuccess(data));
        }).catch(error=> {
            console.log(error);
            dispatch(getWordsError(error));
        })
        if(error){
            alert(error);
            dispatch(clearState());
        }
    }, []);
    if(loading) return <Loader/> 
    return <Container maxWidth="sm">
        <Button onClick={count === 0? () => navigate("/") : () => setCount((prev) => prev-1)}>
        <ArrowBack />
        </Button>
        <h1>Learning {params} Language</h1>
        <hr />
        <Stack direction="row" spacing={2}   sx={{ fontSize: '20px', marginTop: "20px", fontWeight: "bold"}}>
            <p>{count + 1}:</p>
            <p>{words[count]?.word}{" ->"}</p>
            <p>{words[count]?.meaning}</p>
        </Stack>
        <br/>
        <Button onClick={() => {count === words.length-1 ? navigate(`/quiz?language=${params}`): nextHandler()}} variant="contained" color="error" fullWidth>{count === 7 ? "text" : "Next"}</Button>
    </Container>
};

export default Learning;