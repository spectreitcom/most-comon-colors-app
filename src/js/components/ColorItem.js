import react from "react";
import {copyToClipboard} from "../helpers";
import {toast, ToastContainer} from "react-toastify";

function ColorItem({color}) {

    const _copyToClipboard = () => {
        copyToClipboard(`#${color.hex}`);
        toast(`Color ${color.hex} copied to clipboard`);
    };

    return <div className="color-item" style={{backgroundColor: color.bg_css_value}} onClick={_copyToClipboard}>
        #{color.hex}
        <br/>
        <small>{color.count}</small>
    </div>
}

export default ColorItem;