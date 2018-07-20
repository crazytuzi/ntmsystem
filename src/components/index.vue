<template>
    <div>
        <el-container>
            <el-header class="el-header" height=200px>
                <el-row :gutter="20">
                    <el-col :span="6" :push="3">
                        <div class="grid-content bg-purple">
                            <i class="el-icon-news"></i>
                            <!-- <p class="opitem" index="1">流量抓取</p> -->
                            <div class="tab" v-on:click="toggleTab('datas')"><a>流量抓取</a></div>
                        </div>
                    </el-col>
                    <el-col :span="6" :push="3">
                        <div class="grid-content bg-purple">
                            <i class="el-icon-news"></i>
                            <!-- <p class="opitem" index="2" >统计</p> -->
                            <div class="tab" v-on:click="toggleTab('analyze')"><a>行为分析</a></div>
                        </div>
                    </el-col>
                    <el-col :span="6" :push="3">
                        <div class="grid-content bg-purple">
                            <i class="el-icon-news"></i>
                            <!-- <p class="opitem" index="3">可视化分析</p> -->
                            <div class="tab" v-on:click="toggleTab('statistics')"><a>用户分析</a></div>
                        </div>
                    </el-col>
                </el-row>
                <!-- keep-alive 将切换出去的组件保留在内存中 -->
                <datas :is="currentTab" keep-alive></datas>
            </el-header>
            <el-footer>

            </el-footer>
        </el-container>
    </div>

</template>

<script>
    import datas from '@/components/datas';
    import statistics from '@/components/statistics';
    import analyze from '@/components/analyze';

    export default {
        datas: [],
        methods: {
            toggleTab: function (tab) {
                //this.currentTab = tab; // tab 为当前触发标签页的组件名
                //this.destroyed(tab);
                //this.creat(tab);
                this.currentTab = tab;
            },
        },
        created: function () {
            /*
    this.$http.post('/api/data/selectAll', {
            },{emulateJSON:true}).then((response) => {
                console.log(response.body);
                this.datas=response.body;
                this.$bus.$emit('childa-message',this.datas);
            })
            */
        },
        components: { // 声明子组件
            datas,
            statistics,
            analyze
        },
        data() {
            return {
                datas: '',
                currentTab: 'datas'
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        background: url(../assets/nav_banner.jpg);
        background-size: 100% 100%;
        line-height: 60px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 450px;*/
    }

    .el-footer {
        /* background-color: #B3C0D1;
        color: #333; */
        text-align: center;
        line-height: 60px;
    }

    .el-row {
        margin-top: 120px;
        align-items: center;
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .el-icon-news {
        color: white;
    }

    .opitem {
        margin-top: -25px;
        color: white;
    }

    .infostable {
        align-items: center;
    }

    .block {
        margin-top: 15px;
    }

    .tab {
        margin-top: -25px;
        color: white;
    }
</style>