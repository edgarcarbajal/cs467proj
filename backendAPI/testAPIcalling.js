// One method of calling API (GET is shown below)
//
// fetch('127.0.0.1:8000/testAPI')
//     .then(response => {
//         return response.json()
//     })
//     .then(users => {
//         console.log(users)
//     })


// or use functions (either const 'fat arrow' functions method or regular functions method)!

const getAPI = async (url) => {
    const response = await fetch(url, {method: "GET"});
    const resData = await response.json();
    return resData;
};

// The rest of the CRUD ops below!
// Op type  | HTTP Request type
// --------------------
// Create --> POST
// Read ----> GET
// Update --> PUT
// Delete --> DELETE


const postAPI = async (url, reqData) => {
    const request = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        method: "POST",
        body: JSON.stringify(reqData)
    };

    const response = await fetch(url, request);
    const resData = await response.json();
    return resData;
};

const putAPI = async (url, reqData) => {
    const request = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        method: "PUT",
        body: JSON.stringify(reqData)
    };

    const response = await fetch(url, request);
    const resData = await response.json();
    return resData;
};



//Need to add `reqData` parameter later to find exact row to delete!
const deleteAPI = async (url) => {
    const response = await fetch(url, {method: "DELETE"});
    const resData = await response.json();
    return resData;
};


// test calling the external sys API

postAPI(
    'http://blitz.cs.niu.edu/PurchaseOrder/', 
    {
        order: 'xyz-987654321-ba',
        associate: 'RE-676732',
        custid: '2',
        amount: '7654.32'
    }
).then(data => console.log(data));
