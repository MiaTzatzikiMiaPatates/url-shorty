import * as groupsModel from '../models/groups-model.js'

export const getAllGroups = () => {
    return groupsModel.getAllGroups();
}

export const addGroup = (category: string) => {
    return groupsModel.addGroup(category);
}

export const renameGroup = (newName: string, id: number) => {
    return groupsModel.renameGroup(newName, id);
}

export const deleteGroup = (id: number) => {
    return groupsModel.deleteGroup(id);
}

export const groupAlreadyExists = (name: string): boolean => {
    return Object.values(groupsModel.groupAlreadyExists(name) as Record<string, number>)[0]  === 1;
}