export const guest = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if(token != null) {
        console.log(token);
        console.log(token == "undefined");
        return res.sendStatus(403);
    }
    next();
}