import issues from "../models/issues.js";

export const createIssue = async (data) => {
    return await issues.create(data);
}
export const editIssue = async (id, data) => {
    return await issues.findByIdAndUpdate(id, { $set: data }, { new: true });
}
