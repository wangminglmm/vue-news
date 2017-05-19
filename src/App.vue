<template>
  <div id="app">
    <mt-header fixed title="新闻首页">
      <router-link to="/" slot="left" v-show="show_back">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button class="mui-icon mui-icon-bars" slot="right" style="font-size: 18px;" @click="show_picker"></mt-button>
    </mt-header>
    <mt-picker :slots="slots" @change="onValuesChange" v-show="is_show">
    </mt-picker>
    <div class="mask" v-show="is_show" @touchmove="move($event)" @click="confirm($event)"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'app',
  data () {
    return {
      is_show: false,
      promise: null,
      msg: '',
      type: 1,
      slots: [
        {
          flex: 1,
          values: ['军事', '体育', '科技', '教育', '娱乐', '财经', '股票', '旅游', '女人'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  computed: {
    show_back: function(){
      return this.$route.path.indexOf('/home')!=-1 ? false : true;
    }
  },
  methods: {
    show_picker(){
      this.is_show = true;
    },
    onValuesChange(picker, values) {
      this.msg = values[0];
    },
    move(e){
      e.preventDefault();
      return false
    },
    confirm(e){
      e.stopPropagation();
      MessageBox.confirm('你确定要切换到'+this.msg+'吗？').then(action => {
        this.is_show = false;
        this.type = this.slots[0].values.indexOf(this.msg);
        this.$router.push('/home/'+this.type)
      },(status)=>{
        this.is_show = false;
      });
    }
  }
}
</script>

<style scoped>
  .picker{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
  }
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
</style>
