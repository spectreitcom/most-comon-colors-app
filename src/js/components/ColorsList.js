import react from "react";
import ColorItem from "./ColorItem";

function ColorsList({colors}) {

    if (!colors || !colors.length) return '';

    return <div className="colors-list">
        {colors.map(item => <ColorItem key={item.rgb} color={item} />)}
    </div>
}

export default ColorsList;