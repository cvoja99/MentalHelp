const checkPermissions = (foundUser, currentUser) => {
    if(currentUser.tip === "Admin")
    return true;
    return foundUser.id === currentUser.id || typeMap(currentUser.tip) > typeMap(foundUser.tip);
}

const typeMap = (type) => {
    const types = {
        "Korisnik":0,
        "Strucno lice": 1,
        "Admin": 2
    }
    return types[type] || -1;
}

module.exports = checkPermissions