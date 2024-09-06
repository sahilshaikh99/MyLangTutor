import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getResult } from '../redux/slices';

//Quiz Page
const Quiz = () => {
    const [result, setResult] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [ans, setAns] = useState<string>("");

    const navigation = useNavigate();

    const { words } = useSelector((state: {root : stateType}) => state.root);

    const dispatch = useDispatch();

    const nextHandler = (): void => {
        setResult((prev) => [...prev, ans]);
        setCount((prev) => prev + 1);
        setAns("");
    }

    useEffect(() =>{
        dispatch(getResult(result));
        if(count+1 > words.length) navigation('/result');
    },[result]);

    const param = useSearchParams()[0].get("language") as LangType;

    return <Container maxWidth="sm">
        <Button onClick={count === 0? () => navigation("/") : () => setCount((prev) => prev-1)}>
        <ArrowBack />
        </Button>
        <h1>{param} Language Quiz</h1>
        <hr />
        <Stack direction="row" spacing={2} sx={{ fontSize: '20px', marginTop: "20px", fontWeight: "bold"}}>
            <p>{count + 1}:</p>
            <p>{words[count]?.word}</p>
        </Stack>
        <br/>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select Option</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={ans}
                onChange={(e) => setAns(e.target.value)}>
                    { words[count]?.options.map((i, index) => (
                        <FormControlLabel value={i} control={<Radio />} label={i} key={index}/>

                    ))}
            </RadioGroup>
            </FormControl>
        <br/>
        <Button onClick={() => nextHandler()} variant="contained" color="error" fullWidth>{count === 7 ? "text" : "Next"}</Button>
    </Container>
};

export default Quiz;