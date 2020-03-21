const users = []

const addUser = (id, pollId)=>{
    const user = {
        id,
        pollId
    }
    users.push(user)

    return user
}

const getUser = (id)=>{
    return users.find((user) => user.id === id)
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

module.exports = {
    addUser,
    removeUser,
    getUser
}