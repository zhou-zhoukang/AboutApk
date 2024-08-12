import axios from "axios";

const findAll = async (type: "sdk" | "url"): Promise<Filter[]> => {
    const res = await axios.get(`/api/${type}_filter/find_all`)
    return res.data
}

const add = async (filter: Filter, type: "sdk" | "url") => {
    const formData = new FormData();
    formData.append('rule', filter.rule)
    const res = await axios.post(`/api/${type}_filter/add`, formData)
    return res.data
}

const update = async (filter: Filter, type: "sdk" | "url") => {
    const formData = new FormData();
    formData.append('id', filter.id.toString())
    formData.append('rule', filter.rule)
    const res = await axios.put(`/api/${type}_filter/add`, formData)
    return res.data
}

const deleteOne = async (id: number, type: "sdk" | "url") => {
    const res = await axios.delete(`/api/${type}_filter/delete/${id}`)
    return res.data;
}

const FilterService = {
    add: add,
    update: update,
    findAll: findAll,
    deleteOne: deleteOne
}

export default FilterService
