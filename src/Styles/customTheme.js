import { createTheme } from "@mui/material";

const customTheme = createTheme({
    palette: {
        obscure: {
            main: '#262626',
            light: '#000000',
            dark: '#000000',
            contrastText: '#50A060'
        },
        soulgreen: {
            main: '#50A060',
            light: '#33683e',
            dark: '#33683e',
            contrastText: '#33683e'
        },
    },
});

export default customTheme