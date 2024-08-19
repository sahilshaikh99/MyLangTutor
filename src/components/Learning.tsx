import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import Stack from '@mui/material/Stack';


const Learning = () => {
    const [count, setCount] = useState<number>(0);
    const params = useSearchParams()[0].get("language") as LangType;
    const navigate = useNavigate();
    
    const nextHandler = (): void => {
        setCount((prev) => prev + 1);
    }
    return <Container maxWidth="sm">
        <Button onClick={count === 0? () => navigate("/") : () => setCount((prev) => prev-1)}>
        <ArrowBack />
        </Button>
        <h1>Learning {params} Language</h1>
        <hr />
        <Stack direction="row" spacing={2}   sx={{ fontSize: '20px', marginTop: "20px", fontWeight: "bold"}}>
            <p>{count + 1}:</p>
            <p>Sample {"->"}</p>
            <p>Lol</p>
            <VolumeUp style={{color: "red"}}/>
        </Stack>
        <br/>
        <Button onClick={() => {count === 7 ? navigate(`/quiz?language=${params}`): nextHandler()}} variant="contained" color="error" fullWidth>{count === 7 ? "text" : "Next"}</Button>
    </Container>
};

export default Learning;