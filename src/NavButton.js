import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function NavButton(props) {
    const navigate = useNavigate();
    const handleClick = (to) => {
        navigate(to);
    };

    return (
        <Button onClick={() => handleClick(props.to)}>{props.children}</Button>
    );
}

NavButton.propTypes = { to: PropTypes.string, children: PropTypes.string };

export default NavButton;
