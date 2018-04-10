var crypto = require('crypto');

var generateRandomString = (len) => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len);
};

var hashPassword = (password, algorithm, salt) => {
    let hash = crypto.createHmac(algorithm, salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

var saltHashPassword = (password) => {
    let hashed = hashPassword(password, 'sha512', generateRandomString(16));
    console.log('Password before -> ', password);
    console.log('Password after -> ', hashed.passwordHash),
    console.log('Generated salt -> ', hashed.salt);
};

module.exports = {
    saltHashPassword:saltHashPassword
};