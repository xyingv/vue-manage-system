<template>
    <div>
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':!collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHeader from './Header'
import vSidebar from './Sidebar'
import vTags from './Tags'
import bus from './bus'
export default {
  name: 'Home',
  data () {
    return {
      collapse: false
    }
  },
  components: {
    vHeader,
    vSidebar,
    vTags
  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style>
</style>
