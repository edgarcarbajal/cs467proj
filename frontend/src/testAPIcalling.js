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

// using spread operator on reqData to place attributes needed to send to API on same object as method attribute (testing)!
const getAPI = async (url, reqData) => {
    let resData;
    try {
        const response = await fetch(url, {method: "GET", ...reqData});
        resData = await response.json();
    }
    catch(error) {
        console.log('getAPI - Error:', error);
    }

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

    let resData;
    try {
        const response = await fetch(url, request);
        resData = await response.json();
    }
    catch (error) {
        console.log('postAPI - Error:', error);
    }
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

    let resData;
    try {
        const response = await fetch(url, request);
        resData = await response.json();
    }
    catch (error) {
        console.log('putAPI - Error:', error);
    }
    return resData;
};



//Need to add `reqData` parameter later to find exact row to delete!
const deleteAPI = async (url) => {
    let resData;
    try {
        const response = await fetch(url, {method: "DELETE"});
        resData = await response.json();
    }
    catch (error) {
        console.log('deleteAPI - Error:', error);
    }
    return resData;
};


// test calling the external sys API

// postAPI(
//     'http://blitz.cs.niu.edu/PurchaseOrder/', 
//     {
//         order: 'fakeorder_id',
//         associate: 'RE-676732',
//         custid: '45',
//         amount: '7654.32'
//     }
// ).then(data => console.log(data));


// export the generic api functions for use later in frontend
export {getAPI, putAPI, deleteAPI, postAPI};
