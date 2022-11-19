import react, {useState} from 'react';
import ColorsList from "./components/ColorsList";
import FileUploader from "./components/FileUploader";
import {Api} from "./api";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Loader from "./components/Loader";

function App() {

    const [colors, setColors] = useState([]);
    const [processing, setProcessing] = useState(false);

    const onSubmitHandler = async file => {
        setProcessing(true);
        const data = await Api.upload(file);
        setColors(data.colors);
        setProcessing(false);
    };

    return <div className="app">

        <div className="app__inner">

           <div className="app__inner-left" style={{display: colors.length ? 'block' : 'none'}}>
               {colors && colors.length ? <ColorsList colors={colors} /> : ''}
           </div>

           <div className="app__inner-right" style={{width: colors.length ? '50%' : '100%'}}>
               <FileUploader onSubmit={onSubmitHandler} />
           </div>

        </div>

        <ToastContainer />

        {processing ? <Loader /> : ''}

    </div>
}

export default App;