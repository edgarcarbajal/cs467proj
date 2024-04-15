import {scryptSync, randomBytes, timingSafeEqual, createHmac} from 'crypto'
import jwt from 'jsonwebtoken';

// hash function that calls a function in crypto node module
// uses 'sha256' hashing algo on 'inputStr' and outputs it in 'base64' or 'hex' characters
// Base64 always returns 44 chars. Hex always returns 64
//const hash = (inputStr) => createHash('sha256').update(inputStr).digest('base64url');


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


const login = (username, password, storedUser) => {
    //use username/ID to find user in DB, right now only passing in as arg
    const [salt, key] = storedUser.password.split(':');
    const hashNsaltBuffer = scryptSync(password, salt, 64); // Not a string here, but a buffer of data in JS

    const keyBuffer = Buffer.from(key, outputType); // convert saved string to a buffer too
    const match = timingSafeEqual(hashNsaltBuffer, keyBuffer) // check if buffers have same contents in a timing-safe way

    return match && (username === storedUser.username);
};



const generateJWT = (payload) => {
    const tokenOptions = {
        expiresIn: '3h'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
}

// wrapped actual middleware with another function to pass in extra params not needed by express
const authMiddleware = (userAuthType) => {
    // returns function that is the actual middleware needed by express
    return (request, response, next) => {
        const token = request.headers.authorization;
    
        if (!token)
            return response.status(401).json({message: 'Unauthorized Access: No Login Token Credentials - Please Sign In.'});
    
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedPayload) => {
            if (error) {
                console.log('Auth Error:', error.message);
                return response.status(401).json({
                    message: 'Unauthorized Access: Invalid Login Token Credentials',
                    authCode: 401
                });
            }

            const permLvlErrorMsg = `Auth Error: Unauthorized Access: User\'s permissions are not the right level. User is permission type \'${decodedPayload.userType}\', but authorized access only for type \'${userAuthType}\'.`
            if (userAuthType != '' && decodedPayload.userType != userAuthType){
                console.log(permLvlErrorMsg);
                return response.status(401).json({
                    message: permLvlErrorMsg,
                    authCode: 401
                });
            }
    
            request.user = decodedPayload;
    
            next(); // expressjs-router to move to next middleware/callback function
        })
    }
}

/* -- USING A LIBRARY NOW INSTEAD OF IMPLEMENTING IT OURSELVES /\/\/\
    Generates a JSON Web Token (JWT)
    Consists of 3 encoded parts (separated by '.'):
        - JOSE header: A JSON object Signing and Encryption (i.e. JOSE) that tell you the type of hashing algo used & type of token
        - Payload: JSON object containing info about something (usu. user info)
        - Signature: A string where you append encoded Header, & encoded payload, and then encrypt it using a private key.
*/
// const generateJWT = (payload, privateKey) => {
//     const encodedHeader = btoa(JSON.stringify({
//         alg: "HS256",
//         typ: "JWT"
//     }));
//     const encodedPayload = btoa(JSON.stringify(payload));

//     const unencryptStr = encodedHeader + '.' + encodedPayload;
//     const tokensignature = createHmac('sha256', privateKey).update(unencryptStr).digest('base64url');

//     const token = unencryptStr + '.' + tokensignature;

//     return token
// }

// const verifyJWT = (token, privateKey) => {
//     const [header, payload, originalSignature] = token.split('.', 3);

//     const unencryptStr = header + '.' + payload;
//     const testSignature = createHmac('sha256', privateKey).update(unencryptStr).digest('base64url');

//     if (originalSignature === testSignature)
//         console.log('JWT is valid!');
//     else
//         console.log('JWT is NOT valid!');
// }


// const testPayload = {
//     "sub": "1234567890",
//     "name": "John Doe",
//     "admin": true
// }
// const token = generateJWT(testPayload, 'testPrivateKey');
// verifyJWT(token, 'testPrivateKey');


// const user = signup('testemail@google.com', 'test123');
// console.log(user, user.password.length);

// login('testemail@google.com', 'test123', user);

// // dummy passwords for the dummy data!
// const dummypasswords = ['iphone123', 'android456', 'windows789', 'macos000', 'linux101', '1random1', 'c00l$tuF5', 'n0m0rePass', 'pizza', 'tacos'];
// let users = [];
// dummypasswords.forEach(pass => users.push(signup('testusername', pass)));

// //print what will be stored in db for password field + the length
// users.forEach(user => {
//     console.log('db_hashed_pass:', user.password, user.password.length);
// })

// // test logins work
// for(let i = 0; i < users.length; i++) {
//     login('testusername', dummypasswords[i], users[i]);
// }


export {signup, login, generateJWT, authMiddleware};
