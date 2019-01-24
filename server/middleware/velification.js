import jwt from 'jsonwebtoken';

module.exports = {
    verifyToken:(req, res, next) => {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).send({error:'authentication failed'});
}
        const split = token.split(' ');
        jwt.verify(split[1],'secret-key',(error,decoded) => {
            if(error) {
                return res.status(401).send({error:'Failed to decode the token'});
}
            if(decoded){
                req.user=decoded;
                next();
} else {
                return res.status(401).json({error:'authentication failed'});

}
})
}
}