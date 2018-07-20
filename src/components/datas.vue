<template>
    <div style="text-align:center; margin-top: -160px;">
        <div class="eltable">
            <el-table
                    :row-class-name="tableRowClassName"
                    :data="tableData"
                    style=""
                    class='tableclass'>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="sip"
                        label="Source IP "
                        width="150"
                        :formatter="formatter">
                </el-table-column>
                <el-table-column
                        prop="sport"
                        label="Source Port "
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="dip"
                        label="Destination IP"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="dport"
                        label="Destination Port"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="protocol"
                        label="Protocol"
                        width="150"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.protocol === ('SMTP' ||'HTTP' )? 'primary': 'success'"
                                disable-transitions>{{scope.row.protocol}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="idate"
                        label="Time"
                        width="150">
                    <!--

                      sortable
                      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                    :filter-method="filterHandler" -->
                </el-table-column>
                <el-table-column
                        prop="rtype"
                        label="Tag"
                        width="200"
                        filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <el-tag

                                disable-transitions>
                            {{scope.row.rtype}}
                        </el-tag>
                    </template>
                    <!-- :filters="[{ text: '工作', value: '工作' }, { text: '视频', value: '视频'},{ text: '购物', value: '购物' },{ text: '游戏', value: '游戏' },{ text: '其他', value: '其他' },{ text: '邮件', value: '邮件' }]"
                      :type="scope.row.rtype === '工作' ? 'primary' : 'success'"
                    :filter-method="filterTag"
                    filter-placement="bottom-end" -->

                </el-table-column>
            </el-table>
        </div>

        <div class="block">
            <el-pagination
                    :data="pages"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                tableData: [],
                currentPage: 1,
                total: 100,
                pageSize: 10,
                pages: [{
                    currentPage1: 5,
                    currentPage2: 5,
                    currentPage3: 5,
                    currentPage4: 4
                }]
            }
        },
        methods: {
            timeFormatter(value) {
                var da = new Date(value.replace("/Date(", "").replace(")/", "").split("+")[0]);
                return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1) : (da.getMonth() + 1)) + "-" + (da.getDate() < 10 ? "0" + da.getDate() : da.getDate()) + " " + (da.getHours() < 10 ? "0" + da.getHours() : da.getHours()) + ":" + (da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes()) + ":" + (da.getSeconds() < 10 ? "0" + da.getSeconds() : da.getSeconds());
            },
            tableRowClassName({row, rowIndex}) {
                if (row['protocol'] == 'HTTP' || row['protocol'] == 'SMTP') {
                    return 'warning-row';
                }
                return '';
            },
            selectPart(start) {
                this.$http.post('/api/data/selectPart', {
                    start: start,
                    pageSize: this.pageSize,
                }, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++) {
                        response.body[i]['idate']=this.timeFormatter(response.body[i]['idate']);
                    }
                    this.tableData = response.body;
                })
            },
            formatter(row, column) {
                return row.sip;
            },
            filterTag(value, row) {
                return row.rtype === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                var start = (this.currentPage - 1) * this.pageSize;
                this.selectPart(start);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                var start = (this.currentPage - 1) * this.pageSize;
                this.selectPart(start);
            },
            loopGet() {
                setInterval(this.getDataCount, 60000);
                setInterval(this.getData, 60000);
            },
            getDataCount() {
                this.$http.post('/api/data/selectAllCount', {}, {emulateJSON: true}).then((response) => {
                    this.total = response.body[0]['count(*)'];
                })
            },
            getData() {
                this.currentPage = 1;
                this.selectPart(0);
            }
        },
        created: function () {
            this.currentPage = 1;
        },
        mounted() {
            this.selectPart(0);
            this.getDataCount();
            this.loopGet();
        }
    }
</script>
<style type="text/css">
    .el-table .warning-row {
        background: #ff3300;
    }
</style>