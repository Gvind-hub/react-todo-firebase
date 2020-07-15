export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
};
export const updateSubObjectInArray = (items, itemIndex, newObjProps) => {
    return items.map((u, index) => {
        if (index === itemIndex) {
            return {...u, ...newObjProps}
        }
        return u;
    })
};
export const updateArray = (items, itemIndex, newObjProps) => {
    return items.map((u, index) => {
        if (index === itemIndex) {
            return newObjProps
        }
        return u;
    })
};
export const removeObjectFromArray = (items, itemId, objPropName) => items.filter(u => u[objPropName] !== itemId);
export const removeSubObjectFromArray = (items, itemIndex) => items.filter((u, index) => index !== itemIndex);