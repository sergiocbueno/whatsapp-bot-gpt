interface User {
    name: string
    age: number
}

function init (user: User) {
    console.log(user)
}

init({name: 'Sergio2', age: 30})