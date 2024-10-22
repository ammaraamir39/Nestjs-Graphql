/* eslint-disable prettier/prettier */
const Fetch = {
    fetch (key: string, fallback: any = '') {
        return process.env[key] || fallback;
    },
    match(key: string, match: any) {
        return process.env[key] === match;
    }
};

export default Fetch;
