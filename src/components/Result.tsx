import { Container, Grid, } from "@mui/material";
import { useSelector } from "react-redux";
import { matchResult } from "../utils/features";

const Result = () => {

    const { words, result } = useSelector((state: {root : stateType}) => state.root); 

    const matchCount = matchResult(result, words.map(i=> i.meaning));
    const percentage = (matchCount / words?.length) * 100;
    return <Container maxWidth="sm">
    <h1>Result</h1>
    <hr />
    <h3>You got {matchCount} out of {words?.length}</h3>
    <Grid container spacing={2}>
        <Grid item xs={6}>
        <h2>Your Answer</h2>
            { result.map((i, index)=> (
                <>
                <p key={index}>{index + 1}. {i}</p> 
                </>
            ))}
        </Grid>
        <Grid item xs={6}>
        <h2>Correct Answer</h2>
        { words.map((i, index)=> (
                <>
                <p key={index}>{index + 1}. {i.meaning}</p> 
                </>
            ))}
        </Grid>
    </Grid>
    <p style={{"color": percentage > 50 ? "green" : "red"}}> Result: { percentage > 50 ? "Pass" :  "Fail"}</p>
    <br/>
</Container>
}

export default Result;