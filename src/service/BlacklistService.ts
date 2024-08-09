import axios from "axios";

const findAllWhitelist = async () => {
    const res = await axios.get("/api/whitelist/find_all")
    try {
        return res.data;
    } catch (error) {
        return error;
    }
}

const addWhitelist = async (apk: ApkWhitelist) => {
    const formData = new FormData();
    formData.append('packageName', apk.packageName)
    formData.append('appName', apk.appName)
    formData.append('md5', apk.md5)
    const res = await axios.post("/api/whitelist/add", formData)
    try {
        return res.data;
    } catch (error) {
        return error;
    }
}

const updateWhitelist = async (apk: ApkWhitelist) => {
    const formData = new FormData();
    formData.append('id', apk.id.toString())
    formData.append('packageName', apk.packageName)
    formData.append('appName', apk.appName)
    formData.append('md5', apk.md5)
    const res = await axios.put("/api/whitelist/update", formData)
    try {
        return res.data;
    } catch (error) {
        return error;
    }
}

const deleteWhitelist = async (id: number) => {
    const res = await axios.delete(`/api/whitelist/delete/${id}`)
    console.log(`/api/whitelist/delete/${id}`)
    try {
        return res.data;
    } catch (error) {
        return error;
    }
}

const BlacklistService = {
    addWhitelist: addWhitelist,
    updateWhitelist: updateWhitelist,
    findAllWhitelist: findAllWhitelist,
    deleteWhitelist: deleteWhitelist
}

export default BlacklistService
