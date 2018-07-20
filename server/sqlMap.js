// sql语句
var sqlMap = {
    // 用户
    data: {
        selectAll: 'select * from record',
        rtypecout: 'select idate,rtype,COUNT(*) as count from record where idate between ? and ? group by rtype',
        selectRtypeByIdate: 'select rtype,idate from record where idate between ? and ?',
        selectAllCount: 'select count(*) from record',
        selectRtype: 'select rtype,count(*) from record where idate between ? and ? group by rtype',
        selectPart: 'select * from record order by id desc limit ?,?',
        selectMinAndMaxTime: 'select min(idate),max(idate) from record',
        selectMinAndMaxTimeByIP: 'select min(idate),max(idate) from record where sip=?',
        selectSip: 'select * from record where sip=?',
        selectRtypeByIP: 'select rtype,count(*) as count from record where sip=? group by rtype',
        selectRtypeAndIdateByIP: 'select rtype,idate from record where sip=?',
    }
}

module.exports = sqlMap;