// fetch('127.0.0.1:8000/testAPI')
//     .then(response => {
//         return response.json()
//     })
//     .then(users => {
//         console.log(users)
//     })


// or use functions (either const method or function method)!

const getTestAPI = async () => {
    let response = await fetch('http://127.0.0.1:8000/testAPI')
    let data = await response.json()
    return data
}

getTestAPI().then(data => console.log(data))