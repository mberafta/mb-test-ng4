var express = require('express'),
    router = express.Router();

var sendResponse = (res, status, data) => {
    res.status(status);
    res.json(data);
};

router.get('/items', function (req, res) {
    let data = [
        { id: 1, name: "item 1" },
        { id: 2, name: "item 2" },
        { id: 3, name: "item 3" },
        { id: 4, name: "item 4" },
        { id: 5, name: "item 5" }
    ],
        status = 201;

    sendResponse(res, status, data);
});

module.exports = router;