import jwt from 'jsonwebtoken';

module.exports = {
    verifyToken:(req, res, next) => {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).send({
                status: 401,
                error:'authentication failed'});
}
        const split = token.split(' ');
        jwt.verify(split[1],'secretkey',(error,decoded) => {
            if(error) {
                return res.status(401).send({
                    status: 401,
                    error:'invalid token'});
}
            if(decoded){
                req.user=decoded;
                next();
} else {
                return res.status(401).json({
                    status: 401,
                    error:'authentication failed'});

}
})
}
}