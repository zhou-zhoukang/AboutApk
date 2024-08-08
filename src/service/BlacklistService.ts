import axios from "axios";

const findAllWhitelist = async () => {
    const res = await axios.get("/api/whitelist/find_all")
    try {
        return res.data;
    } catch (error) {
        return error;
    }
}

const addWhitelist = () => {

}

const updateWhitelist = () => {

}

const deleteWhitelist = () => {

}

const BlacklistService = {
    addWhitelist: addWhitelist,
    updateWhitelist: updateWhitelist,
    findAllWhitelist: findAllWhitelist,
    deleteWhitelist: deleteWhitelist
}

export default BlacklistService
