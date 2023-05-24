import { AppBar, Toolbar, SvgIcon } from "@mui/material";
import Logo from "./Logo";

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SvgIcon viewBox="0 0 40 40">
                    <Logo />
                </SvgIcon>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
