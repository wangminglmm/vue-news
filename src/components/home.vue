<template>
    <div class="tmpl">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :autoFill="false" :bottomDistance="30">
            <ul>
                <li class="list" v-for="(item,index) in list" :key="index">
                    <router-link :to="'/detail/'+index">
                        <h3>{{item.title}}</h3>
                        <div class="con">
                            <img :src="item.imgurl" alt="" class="pic" :data-src="item.imgurl"/>
                            <span class="time">{{item.time}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓释放刷新</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">加载更多</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    data() {
      return {
        topStatus: '',
        bottomStatus: '',
        list: [],
        pic_list: [],
        num_list: [],
        count: 10,
        page: 1,
        type: 1,
        flag: 'bottom',
        selected: 1
      };
    },
    watch: {
        $route: {
            handler: function(route){
                var type_reg = /\/home\/(\d+)/;
                this.type = type_reg.exec(route.path) ? type_reg.exec(route.path)[1] : 1;
                this.list = [];
                this.flag = 'bottom';
                this.load();
            },
            deep: true
        }
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status){
        console.log(status)
        this.bottomStatus = status;
      },
      loadTop(){
        this.flag = 'top';
        this.load()
      },
      loadBottom(){
        this.page++;
        this.flag = 'bottom';
        this.load()
      },
      load(){
        var _this = this;
        let url = 'https://wangyi.butterfly.mopaasapp.com/news/api'
        const arr = ['war','sport','tech','edu','ent','money','gupiao','travel','lady']
        url += '?type='+arr[this.type]+'&page='+this.page+'&limit='+this.count
        this.$ajax.get(url).then((res)=>{
            if(this.flag == 'bottom' ){
                this.list.push.apply(this.list, res.data.list )
                this.$refs.loadmore.onBottomLoaded()
            }else{
                this.$refs.loadmore.onTopLoaded()
            }
            setTimeout(function(){
                var list = _this.$refs.loadmore.$el.getElementsByClassName('pic');
                list = Array.prototype.slice.apply(list);
                _this.num_list = list.map(function(item){
                    return item.offsetTop;
                })
                _this.pic_list = list;
            }, 1000)
        })
      }
    },
    mounted(){
        var _this = this;
        this.load();
        var widHeight = window.innerHeight;
        var alltop = widHeight;
        window.onscroll = function(e){
            alltop = widHeight + window.scrollY;
            _this.pic_list.forEach(function(v,i){
                var img = new Image();
                var src = v.getAttribute('data-src');
                img.src = v.src;
                img.onload = function(){
                    v.src = src;
                    img = null;
                }
            })
        }
    }
  }
</script>

<style scoped lang="less">
    .tmpl{
        padding-top: 40px;
        // height: 500px;
        .list{
            padding: 10px;
            h3{
                font-size: 20px;
                line-height: 1.5;
            }
            .con{
                display: flex;
                align-items: flex-end;
                .pic{
                    width: 200px;
                    height: auto;
                }
            }
            
        }
    }

</style>