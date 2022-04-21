/**
 * This file is having the logic of mock
 * request and response
 */


 module.exports = {
    mockRequest : () => {
        const req = {};
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        req.query = jest.fn().mockReturnValue(req);

        return req;
    },

    mockResponse : () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);

        return res;
    }
}