import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Stack from '@mui/material/Stack';

const Quiz = () => {
    const [result, setResult] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [ans, setAns] = useState<string>("");

    const navigation = useNavigate();

    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
        setResult((prev) => ({...prev, ans}));
        setAns("");
    }

    const param = useSearchParams()[0].get("language") as LangType;

    return <Container maxWidth="sm">
        <Button onClick={count === 0? () => navigation("/") : () => setCount((prev) => prev-1)}>
        <ArrowBack />
        </Button>
        <h1>{param} Language Quiz</h1>
        <hr />
        <Stack direction="row" spacing={2}   sx={{ fontSize: '20px', marginTop: "20px", fontWeight: "bold"}}>
            <p>{count + 1}:</p>
            <p>Sample</p>
        </Stack>
        <br/>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select Option</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setAns(e.target.value)}>
                <FormControlLabel value="Option1" control={<Radio />} label="Option1"/>
            </RadioGroup>
            </FormControl>
        <br/>
        <Button onClick={() => {count === 7 ? navigation("/result"): nextHandler()}} variant="contained" color="error" fullWidth>{count === 7 ? "text" : "Next"}</Button>
    </Container>
};

export default Quiz;