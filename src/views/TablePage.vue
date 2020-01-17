<template>
  <div class="components-container">
    <div class="title-container">
      <div class="title">{{personName}}</div>
      <el-button round @click="loginOut">退出</el-button>
    </div>
    <div class="content">
      <div class="top-bar">
        <div class="time-bar" v-show="isTodayOver">
          <div class="hour">{{hours}}</div>
          <div class="mao-hao">:</div>
          <div class="minute">{{minutes}}</div>
          <div class="mao-hao">:</div>
          <div class="second">{{seconds}}</div>
        </div>
        <el-button type="primary" @click="getDateInfo">刷新</el-button>
      </div>
      <el-alert class="top-tip"
                v-show="isTipShow"
                :title="tipTitle"
                :type="tipType"
                :description="tipDescription"
                center
                @close="closeTip"
                show-icon>
      </el-alert>
      <div class="table-container">
        <el-table :data="clockInfo" height="95%" stripe border fit size="medium" style="width: 100%">
          <el-table-column prop="worktime" label="日期" align="center" width="50"></el-table-column>
          <el-table-column prop="ban1" label="上午签到" align="center" width="85" >
            <template slot-scope="scope" >
              <el-tag type="success" v-show="scope.row.ban1==='1'">
                <i class="el-icon-check"></i>
              </el-tag>
              <el-tag type="danger" v-show="scope.row.ban1==='4'">
                <i class="el-icon-circle-close"></i>
              </el-tag>
              <el-tag type="info"  v-show="scope.row.ban1==='7'" >
                <i class="el-icon-time"></i>
              </el-tag>
              <el-tag v-show="scope.row.ban1==='8'">
                <i class="el-icon-remove-outline" ></i>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ban2" label="上午签退" align="center" width="85">
            <template slot-scope="scope" >
              <el-tag type="success" v-show="scope.row.ban2==='1'">
                <i class="el-icon-check"></i>
              </el-tag>
              <el-tag type="danger" v-show="scope.row.ban2==='4'">
                <i class="el-icon-circle-close"></i>
              </el-tag>
              <el-tag type="info"  v-show="scope.row.ban2==='7'" >
                <i class="el-icon-time"></i>
              </el-tag>
              <el-tag v-show="scope.row.ban2==='8'">
                <i class="el-icon-remove-outline" ></i>
              </el-tag>
            </template>/el-table-column>
          </el-table-column>
          <el-table-column prop="ban3" label="下午签到" align="center" width="85">
            <template slot-scope="scope" >
              <el-tag type="success" v-show="scope.row.ban3==='1'">
                <i class="el-icon-check"></i>
              </el-tag>
              <el-tag type="danger" v-show="scope.row.ban3==='4'">
                <i class="el-icon-circle-close"></i>
              </el-tag>
              <el-tag type="info"  v-show="scope.row.ban3==='7'" >
                <i class="el-icon-time"></i>
              </el-tag>
              <el-tag v-show="scope.row.ban3==='8'">
                <i class="el-icon-remove-outline" ></i>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ban4" label="下午签退" align="center" width="85">
            <template slot-scope="scope" >
              <el-tag type="success" v-show="scope.row.ban4==='1'">
                <i class="el-icon-check"></i>
              </el-tag>
              <el-tag type="danger" v-show="scope.row.ban4==='4'">
                <i class="el-icon-circle-close"></i>
              </el-tag>
              <el-tag type="info"  v-show="scope.row.ban4==='7'" >
                <i class="el-icon-time"></i>
              </el-tag>
              <el-tag v-show="scope.row.ban4==='8'">
                <i class="el-icon-remove-outline" ></i>
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script scoped>
import Config from '../config/config'
import { ClockIn } from '../apis/interface'

export default {
  name: 'table-page',
  data () {
    return {
      personName: Config.person_name,
      isTodayOver: false,
      isTipShow: true,
      tipTitle: '',
      tipType: '',
      tipDescription: '',
      clockInfo: [],
      seconds: '00',
      minutes: '00',
      hours: '00'
    }
  },
  methods: {
    loginOut () {
      Config.user = null;
      Config.pwd = null;
      Config.isLogin = false;
      Config.isQuit = true;
      this.$router.push({path: '/'});
    },
    closeTip () {
      this.isTipShow = false;
      this.tipTitle = '';
    },
    checkDate () {
      let date = new Date();
      let info = this.clockInfo[date.getDate() - 1];
      if (info.ban1 === '7') {
        this.isTipShow = true;
        this.tipType = 'success';
        this.tipTitle = '今天休息！';
        return;
      }
      if (info.ban1 !== '1') {
        if (info.ban1 === '8') {
          this.clockType = 'morning';
          this.setTime(this.clockType);
          return;
        }
        if (info.ban1 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle += '早上未打卡！';
        }
      }
      if (info.ban2 !== '1') {
        if (info.ban2 === '8') {
          this.clockType = 'noon';
          this.setTime(this.clockType);
          return;
        }
        if (info.ban2 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle += '中午未打卡！！';
        }
      }
      if (info.ban3 !== '1') {
        if (info.ban3 === '8') {
          this.clockType = 'afternoon';
          this.setTime(this.clockType);
          return;
        }
        if (info.ban3 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle += '下午未打卡！';
        }
      }
      if (info.ban4 !== '1') {
        if (info.ban4 === '8') {
          this.clockType = 'night';
          this.setTime(this.clockType);
          return;
        }
        if (info.ban4 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle += '晚上未打卡！';
        }
      }
      /* if (info.ban1 !== '1' && info.ban1 !== '7') {
        if (info.ban1 === '8') {
          this.isTipShow = true;
          this.tipType = 'warning';
          this.tipTitle = '上午还未签到';
        }
        if (info.ban1 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle = '上午已错过签到';
        }
      } else {
        if (info.ban1 === '7') {
          this.isTipShow = true;
          this.tipType = 'success';
          this.tipTitle = '今天休息！';
          return;
        }
      }
      if (info.ban2 !== '1' && info.ban2 !== '7') {
        if (info.ban2 === '8') {
          this.isTipShow = true;
          this.tipType = 'warning';
          this.tipTitle = '上午还未签退！';
        }
        if (info.ban2 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle = '上午已错过签退！';
        }
      }
      if (info.ban3 !== '1' && info.ban3 !== '7') {
        if (info.ban3 === '8') {
          this.isTipShow = true;
          this.tipType = 'warning';
          this.tipTitle = '下午还未签到！';
        }
        if (info.ban3 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle = '下午已错过签到！';
        }
      }
      if (info.ban4 !== '1' && info.ban4 !== '7') {
        if (info.ban4 === '8') {
          this.isTipShow = true;
          this.tipType = 'warning';
          this.tipTitle = '下午还未签退！';
        }
        if (info.ban4 === '4') {
          this.isTipShow = true;
          this.tipType = 'error';
          this.tipTitle = '下午已错过签退！';
        }
      } */
    },
    async getDateInfo () {
      if (!Config.isLogin) {
        this.$router.push({ path: '/' })
        return
      }
      let today = new Date()
      let result = await ClockIn({
        bureau_id: Config.bureau_id,
        person_id: Config.person_id,
        year: (today.getFullYear()),
        month: (today.getMonth() + 1)
      })
      if (result.success) {
        this.clockInfo = result.list;
        this.checkDate();
      }
    },
    setTime (_type) {
      let date = new Date();
      let targetDate = null;
      switch (_type) {
      case 'morning':
        targetDate = new Date();
        targetDate.setHours(8);
        break;
      case 'noon':
        targetDate = new Date();
        targetDate.setHours(12);
        break
      case 'afternoon':
        targetDate = new Date();
        targetDate.setHours(13);
        targetDate.setMinutes(30);
        break
      case 'night':
        targetDate = new Date();
        targetDate.setHours(17);
        targetDate.setMinutes(30);
        break
      }
    }
  },
  created: function () {
    this.getDateInfo();
    setInterval(() => {
      /* this.getDateInfo(); */
    }, 1000);
  }
}
</script>
<style scoped lang="scss">
  .components-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    .title-container{
      width: 100%;
      height: 10%;
      background-color: #cccccc;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 2em;
      font-weight: bold;
      .title{
        color: #3c3c3c;
      }
    }
    .content{
      width: 100%;
      height: 90%;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      .top-bar{
        width: 95%;
        height: 8%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        .time-bar{
          display: inline-flex;
          font-weight: bold;
        }
      }
      .top-tip{
        width: 100%;
      }
      .table-container{
        width: 100%;
        height: 92%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
