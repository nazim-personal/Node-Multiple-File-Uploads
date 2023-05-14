import axios from 'axios';

const api = "http://localhost:3000/api/";

export const uploadSingleFile = async(data, options) =>{

    try {
        await axios.post('api/singleFile', data, options);
    } catch (error) {
        throw error;
    }
}

export const getSingleFile = async() =>{
    try {
        const {data} = await axios.get('api/getSingleFile');
       // console.log('api',data);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getMultipleFile = async() =>{
    try {
        const {data} = await axios.get('api/getMultipleFile');
       // console.log('api',data);
        return data;
    } catch (error) {
        throw error;
    }
}

export const uploadMultipleFile = async(data, options) =>{

    try {
        await axios.post('api/multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}