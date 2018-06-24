<template>
  <list class="list">
    <header>
      <div class="bar">
        <text class="tab active">Hack News</text>
      </div>
    </header>
    <cell v-for="(item, index) in list" :key="index">
      <div class="cell">
        <text class="title">{{item.author}}: {{item.title}}</text>
        <text class="info">{{item.points}} points · {{item.num_comments}} comment</text>
      </div>
    </cell>
    <loading @loading="fetchNews" :display="isLoading ? 'show' : 'hide'" class="load">
      <text class="load">Loading</text>
      <loading-indicator class="indicator"></loading-indicator>
    </loading>
  </list>
</template>
<style>
.list {
  background-color: #efefef;
}
.bar {
  background-color: #fff;
  width: 750px;
  height: 100px;
  margin-bottom: 15px;
  border-bottom-style: solid;
  border-bottom-width: 4px;
  border-bottom-color: #ccc;
}
.tab {
  width: 241px;
  height: 100px;
  margin-left: 41px;
  margin-right: 41px;
  text-align: center;
  vertical-align: baseline;
  line-height: 100px;
  cursor: pointer;
  font-size: 30;
}
.active {
  border-bottom-style: solid;
  border-bottom-width: 4px;
  border-bottom-color: #233;
}
.cell {
  width: 750px;
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
}
.title {
  font-weight: 600;
  font-size: 30;
}
.info {
  font-size: 26;
  color: #bbb;
}
.load {
  width: 750px;
  text-align: center;
  font-size: 30;
  display: flex;
  align-items: center;
}
.indicator {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #6cf;
}
</style>
<script>
const stream = weex.requireModule('stream')
export default {
  name: 'home',
  data: function () {
    return {
      apiUrl: 'http://hn.algolia.com/api/v1/search_by_date?tags=story&page=',
      list: [],
      pos: 1,
      isLoading: false
    }
  },
  methods: {
    fetchNews: function () {
      const vm = this
      vm.isLoading = true
      stream.fetch({
        methods: 'GET',
        url: vm.apiUrl + vm.pos,
        type: 'json'
      }, function (ret) {
        if (!ret.data.hits) return
        if (ret.data.hits.length) {
          vm.list = vm.list.concat(ret.data.hits)
          vm.pos++
          console.log(ret.data.list)
          vm.isLoading = false
        }
      }, function (res) {
        console.log(res)
        vm.isLoading = false
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.fetchNews()
    })
  }
}
</script>
