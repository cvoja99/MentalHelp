import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)`
    background-color:${props=>props.isvalid ? "white":"red"}
`