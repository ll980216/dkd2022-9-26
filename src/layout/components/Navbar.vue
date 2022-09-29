<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <div class="pic"><img src="~@/assets/common/user.png" class="user-avatar" /></div>
            <span class="user-name">欢迎您, <i>admin</i></span>
            <div class="logouticon">退出<i class="el-icon-caret-bottom" @click="logout" /></div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item divided>
            <span style="display:block;">Log Out</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background: url('~@/assets/common/backgroundone.png');
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 24px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        width: 240px;
        height: 60px;
        // background-color: blueviolet;
        line-height: 60px;

        .pic {
          display: inline-block;
          width: 48px;
          height: 60px;
          line-height: 60px;
        }
        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          vertical-align:middle

        }
        .user-name {
          display:inline-block;
          width: 140px;
          line-height: 60px;
          height: 60px;
          // background-color: aqua;
          font-size: 16px;
          color: #fff;
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
          font-weight: 300px;
        }
        .logouticon {
          display: inline-block;
          width: 48px;
          height: 60px;
          // background-color: blue;
          font-size: 16px;
          color: #fff;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          // right: -20px;
          // top: 25px;
          line-height: 60px;
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
}
</style>
