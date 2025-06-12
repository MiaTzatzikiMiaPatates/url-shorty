import * as groupsModel from '../models/groups-model.js'

export const getAllGroups = () => {
    return groupsModel.getAllGroups();
}

export const addGroup = (category) => {
    return groupsModel.addGroup(category);
}

export const renameGroup = (newName, id) => {
    return groupsModel.renameGroup(newName, id);
}

export const deleteGroup = (id) => {
    return groupsModel.deleteGroup(id);
}
