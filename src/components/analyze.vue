<template>
    <div>
        <div class="block">
            <el-date-picker
                    v-model="value"
                    type="datetimerange"
                    align="right"
                    @change="TimeOnChange">
            </el-date-picker>
        </div>
        <div style="width:500px; hieght:500px; float:left; margin-left: 100px; display:inline">
            <ve-line :data="lineData"></ve-line>
        </div>
        <div style="width:500px; hieght:500px; float:right; margin-right: 100px; display:inline">
            <ve-ring :data="ringData" :settings="chartSettings"></ve-ring>
        </div>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common'
    import VeRing from 'v-charts/lib/ring.common'

    export default {
        components: {VeLine, VeRing},
        data() {
            this.chartSettings = {
                roseType: 'radius'
            }
            return {
                lineData: {
                    columns: ['time', '其他', '工作', '游戏', '邮件', '购物', '聊天', '视频'],
                    rows: []
                },
                ringData: {
                    columns: ['行为', '频数'],
                    rows: []
                },
                value: ''
            }
        },
        methods: {
            /*
            日期加减
             */
            addDate(date_time, part, value) {
                var obj = new Date(date_time);
                value *= 1;
                if (isNaN(value)) {
                    value = 0;
                }
                switch (part) {
                    case "y":
                        obj.setFullYear(obj.getFullYear() + value);
                        break;
                    case "m":
                        obj.setMonth(obj.getMonth() + value);
                        break;
                    case "d":
                        obj.setDate(obj.getDate() + value);
                        break;
                    case "h":
                        obj.setHours(obj.getHours() + value);
                        break;
                    case "n":
                        obj.setMinutes(obj.getMinutes() + value);
                        break;
                    case "s":
                        obj.setSeconds(obj.getSeconds() + value);
                        break;
                    default:

                }
                return obj;
            },
            /*
            日期格式转换
             */
            dateFtt(fmt, date) {
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            TimeOnChange(val) {
                /*
                获取改变后的开始时间和结束时间
                */
                this.getLineData();
                this.getRingData();
            },
            /*
            判断getRingData和getlineDate是否在执行,如果在执行,先停止再循环执行
             */
            loopGet() {
                setInterval(this.getRingData, 10000);
                setInterval(this.getLineData, 10000);
            },
            getRingData() {
                var start = this.value[0];
                var end = this.value[1];
                var ringdatas = {
                    columns: ['行为', '频数'],
                    rows: []
                };
                this.$http.post('/api/data/selectRtype', {
                    start: this.dateFtt("yyyy-MM-dd hh:mm:ss", start),
                    end: this.dateFtt("yyyy-MM-dd hh:mm:ss", end)
                }, {}).then((response) => {
                    var ringrow = [
                        {'行为': '其他', '频数': 0},
                        {'行为': '工作', '频数': 0},
                        {'行为': '游戏', '频数': 0},
                        {'行为': '邮件', '频数': 0},
                        {'行为': '购物', '频数': 0},
                        {'行为': '聊天', '频数': 0},
                        {'行为': '视频', '频数': 0}
                    ]
                    for (var i = 0; i < response.body.length; i++) {
                        switch (response.body[i].rtype) {
                            case '其他':
                                ringrow[0]['频数'] = response.body[i].count;
                                break;
                            case '工作':
                                ringrow[1]['频数'] = Math.floor(response.body[i].count * 0.9);
                                break;
                            case '游戏':
                                ringrow[2]['频数'] = response.body[i].count;
                                break;
                            case '邮箱':
                                ringrow[3]['频数'] = response.body[i].count;
                                break;
                            case '购物':
                                ringrow[4]['频数'] = response.body[i].count;
                                break;
                            case '聊天':
                                ringrow[5]['频数'] = Math.floor(response.body[i].count * 0.5);
                                break;
                            case '视频':
                                ringrow[6]['频数'] = Math.floor(response.body[i].count * 0.01);
                                break;
                        }
                    }
                    ringdatas.rows = ringrow;
                    this.ringData = ringdatas;
                })
            },
            getLineData() {
                var start = this.value[0];
                var end = this.value[1];
                var linedatas = {
                    columns: ['time', '其他', '工作', '游戏', '邮件', '购物', '聊天', '视频'],
                    rows: []
                }
                var length = (end - start) / 3600000;
                this.$http.post('/api/data/selectRtypeByIdate', {
                    start: this.dateFtt("yyyy-MM-dd hh:mm:ss", start),
                    end: this.dateFtt("yyyy-MM-dd hh:mm:ss", end)
                }, {emulateJSON: true}).then((response) => {
                    for (var i = 0; i < length; i++) {
                        var start_hour = this.addDate(start, "h", i);
                        start_hour = this.dateFtt("yyyy-MM-dd hh:mm:ss", start_hour);
                        var row = {'time': start_hour, '其他': 0, '工作': 0, '游戏': 0, '邮件': 0, '购物': 0, "聊天": 0, '视频': 0};
                        linedatas.rows.push(row);
                    }
                    for (var i = 0; i < response.body.length; i++) {
                        var tmp_date = new Date(response.body[i].idate);
                        for (var j = 0; j < linedatas.rows.length; j++) {
                            var rows_date_tmp = new Date(linedatas.rows[j]['time']);
                            var rows_date_tmp_addOne = this.addDate(rows_date_tmp, "h", 1);
                            if (rows_date_tmp.getTime() <= tmp_date.getTime() && rows_date_tmp_addOne.getTime() > tmp_date.getTime()) {
                                switch (response.body[i].rtype) {
                                    case '其他':
                                        linedatas.rows[j]['其他']++;
                                        break;
                                    case '工作':
                                        linedatas.rows[j]['工作']++;
                                        break;
                                    case '游戏':
                                        linedatas.rows[j]['游戏']++;
                                        break;
                                    case '邮件':
                                        linedatas.rows[j]['邮件']++;
                                        break;
                                    case '购物':
                                        linedatas.rows[j]['购物']++;
                                        break;
                                    case '聊天':
                                        linedatas.rows[j]['聊天']++;
                                        break;
                                    case '视频':
                                        linedatas.rows[j]['视频']++;
                                        break;
                                }
                                break;
                            }
                        }
                    }
                    for (var i = 0; i < linedatas.rows; i++) {
                        linedatas.rows[i]['视频'] = Math.floor(linedatas.rows[i]['视频'] * 0.01);
                        linedatas.rows[i]['聊天'] = Math.floor(linedatas.rows[i]['聊天'] * 0.5);
                        linedatas.rows[i]['工作'] = Math.floor(linedatas.rows[i]['工作'] * 0.9);
                    }
                    this.lineData = linedatas;
                });
            },
        },
        created: function () {
        },
        mounted() {
            this.$http.post('/api/data/selectMaxAndMinTime', {}, {emulateJSON: true}).then((response) => {
                this.value = [new Date(), new Date()];
                this.value[0] = new Date(response.body[0]['min(idate)']);
                this.value[1] = new Date(response.body[0]['max(idate)']);
                this.getRingData();
                this.getLineData();
            });
            //this.loopGet();
        }
    }
</script>