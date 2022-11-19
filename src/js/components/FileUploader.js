import react, {useState} from "react";
import {isFileSizeGreaterThan, isJPEG, isPNG} from "../helpers";

function FileUploader({onSubmit}) {

    onSubmit = onSubmit || function (arg) {};

    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);


    const hasFileValidType = file => isJPEG(file) || isPNG(file);
    const hasFileValidSize = file => !isFileSizeGreaterThan(file, 300);

    const isFileValid = file => {
        return file && hasFileValidType(file) && hasFileValidSize(file);
    }

    const validateFile = file => {
        setError(null);

        if (!hasFileValidType(file)) {
            setError("You can use only jpeg or png image");
            return;
        }
        if (!hasFileValidSize(file)) {
            setError("Max file size is 300KB");
            return;
        }
    }

    const onInputHandler = e => {
        setFile(null);
        setImagePreview(null);

        const files = e.target.files;
        if (!files.length) return;
        const file = files[0];

        validateFile(file);

        if (isFileValid(file)) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }

    };

    return <div className="file-uploader">

        <div className="file-uploader__preview">
            {imagePreview ? <img src={imagePreview} alt=""/> : ''}
        </div>

        <div className="file-uploader__inner">

            <input className="file-uploader__input" type="file" onChange={onInputHandler} />

            {error ? <p className="file-uploader__error">{error}</p> : ''}

        </div>

        <div>
            <button type="button" disabled={!!error || !isFileValid(file)} onClick={() => onSubmit(file)}>Submit</button>
        </div>

    </div>

}

export default FileUploader;