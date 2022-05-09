import { createGlobalStyle } from "styled-components";

// global style for App.js
export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box; /* causing problems for dropdown menu*/
         margin: 0;
        padding: 0;
        font-family: "Encode Sans Expanded", sans-serif;
    }
`;
