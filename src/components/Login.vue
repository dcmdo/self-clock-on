<template>
  <div class="components-container">
    <div class="title">今天你打卡了么？</div>
    <div class="content">
      <div style="height: 30%"></div>
      <el-input class="item" v-model="user" prefix-icon="el-icon-user" placeholder="输入账号" @input="setUser" clearable ></el-input>
      <el-input class="item" v-model="pwd"  prefix-icon="el-icon-more-outline"  placeholder="输入密码" @input="setPwd" clearable show-password></el-input>
      <div class="item-small">
        <div class="item-small-sub-container">
          <el-checkbox v-model="isRecord">记住密码</el-checkbox>
          <el-checkbox v-model="isAuto">自动登录</el-checkbox>
        </div>
      </div>
      <el-button class="item-button" type="primary" :disabled="isDisable" @click="onSubmit">登录</el-button>
      <div class="item-small">
        <el-alert
          v-show="isTipShow"
          :title="tipTitle"
          :type="tipType"
          :description="tipDescription"
          center
          @close="closeTip"
          show-icon>
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
import {Login} from '../apis/interface';
import Config from '../config/config';
export default {
  name: 'LoginPage',
  data() {
    return {
      user: '',
      pwd: '',
      isDisable: true,
      isTipShow: false,
      tipTitle: '',
      tipType: '',
      tipDescription: '',
      isRecord: false,
      isAuto: false
    }
  },
  methods: {
    async onSubmit() {
      let result = await Login({user: this.user, pwd: this.pwd});
      this.isTipShow = true;
      if (result.success) {
        this.tipType = 'success';
        this.tipTitle = '成功';
        this.tipDescription = result.info;
        Config.user = this.user;
        Config.pwd = this.pwd;
        Config.bureau_id = result.bureau_id;
        Config.identity_id = result.identity_id;
        Config.login_name = result.login_name;
        Config.person_name = result.person_name;
        Config.person_id = result.person_id;
        Config.plat_token = result.plat_token;
        Config.isQuit = false;
        Config.isLogin = result.success;
        let _info = {
          isAuto: this.isAuto,
          isRecord: this.isRecord,
          user: this.user,
          pwd: this.pwd
        };
        localStorage.setItem('userInfo', JSON.stringify(_info));
        this.$router.push({ name: 'table' });
      } else {
        this.tipType = 'error';
        this.tipTitle = '失败';
        this.tipDescription = result.info;
      }
    },
    setUser () {
      this.isDisable = !(this.user && this.pwd);
    },
    setPwd () {
      this.isDisable = !(this.user && this.pwd);
    },
    closeTip () {
      this.isTipShow = false;
    }
  },
  created: function () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.isRecord = userInfo.isRecord;
      this.isAuto = userInfo.isAuto;
      if (this.isAuto) {
        this.user = userInfo.user;
        this.pwd = userInfo.pwd;
        this.isDisable = false;
        if (!Config.isQuit) {
          this.onSubmit();
        }
        return
      }
      if (this.isRecord) {
        this.user = userInfo.user;
        this.pwd = userInfo.pwd;
        this.isDisable = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .components-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    .title{
      width: 100%;
      height: 10%;
      background-color: #cccccc;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2em;
      font-weight: bold;
    }
    .content{
      width: 100%;
      height: 70%;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      .item {
        width: 80%;
        height: 3em;
        margin: 1em 0;
      }
      .item-button{
        width: 80%;
        height: 3em;
      }
      .item-small{
        width: 80%;
        height: auto;
        margin: 0.3em 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        overflow: auto;
        .item-small-sub-container{
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
</style>
