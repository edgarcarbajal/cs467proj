import {scryptSync, randomBytes, timingSafeEqual} from 'crypto'

// hash function that calls a function in crypto node module
// uses 'sha256' hashing algo on 'inputStr' and outputs it in 'base64' or 'hex' characters
// Base64 always returns 44 chars. Hex always returns 64
    // const hash = (inputStr) => createHash('sha256').update(inputStr).digest('hex');


    // let testpassword = 'hello123manmyPass$wordSoLong?!';
    // let tp2 = '123';

    // const hash1 = hash(testpassword);
    // console.log(hash1, hash1.length);

    // const hash2 = hash(tp2);
    // console.log(hash2, hash2.length);

    // console.log('done!');


const outputType = 'base64';
// Can also create a more secure hash with a salt!
// scryptSync replaces createHash here
const signup = (username, password) => {
    const salt = randomBytes(16).toString(outputType);
    const hashNsaltPass = scryptSync(password, salt, 64).toString(outputType);

    const userInfo = {
        username,
        password: `${salt}:${hashNsaltPass}`
    };

    return userInfo;
};


const login = (username, password, testUser) => {
    //use username/ID to find user in DB, right now only passing in as arg
    const [salt, key] = testUser.password.split(':');
    const hashNsaltBuffer = scryptSync(password, salt, 64); // Not a string here, but a buffer of data in JS

    const keyBuffer = Buffer.from(key, outputType); // convert saved string to a buffer too
    const match = timingSafeEqual(hashNsaltBuffer, keyBuffer) // check if buffers have same contents in a timing-safe way

    if (match) {
        console.log('login success!!')
    } 
    else {
        console.log('login fail!')
    }
};



const user = signup('testemail@google.com', 'test123');
console.log(user, user.password.length);

login('testemail@google.com', 'test123', user);
