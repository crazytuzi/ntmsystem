var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 查询record
router.post('/selectAll', (req, res) => {
    var sql = $sql.data.selectAll;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


// 查询record
router.post('/selectRtype', (req, res) => {
    var sql = $sql.data.rtypecout;
    var params = req.body;
    conn.query(sql, [params.start, params.end], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询部分record
router.post('/selectPart', (req, res) => {
    var sql = $sql.data.selectPart;
    var params = req.body;
    conn.query(sql, [params.start, params.pageSize], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 查询record数量
router.post('/selectAllCount', (req, res) => {
    var sql = $sql.data.selectAllCount;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询record
router.post('/selectRtypeByIdate', (req, res) => {
    var sql = $sql.data.selectRtypeByIdate;
    var params = req.body;
    conn.query(sql, [params.start, params.end], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询record
router.post('/selectMaxAndMinTime', (req, res) => {
    var sql = $sql.data.selectMinAndMaxTime;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/selectSip', (req, res) => {
    var sql = $sql.data.selectSip;
    var params = req.body;
    conn.query(sql, [params.str], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


router.post('/selectMaxAndMinTimeByIP', (req, res) => {
    var sql = $sql.data.selectMinAndMaxTimeByIP;
    var params = req.body;
    conn.query(sql, [params.ip], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/selectRtypeByIP', (req, res) => {
    var sql = $sql.data.selectRtypeByIP;
    var params = req.body;
    conn.query(sql, [params.ip], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/selectRtypeAndIdateByIP', (req, res) => {
    var sql = $sql.data.selectRtypeAndIdateByIP;
    var params = req.body;
    conn.query(sql, [params.ip], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;