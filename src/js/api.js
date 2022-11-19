import axios from "axios";

export class Api {

    static upload(file) {
        const formData = new FormData();
        formData.append('image', file);

        return axios.post('/api/upload', formData)
            .then(res => res.data);
    }

}