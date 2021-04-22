<template>
  <div style="width: 100%;height: 100%;">
    <a-menu
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart"/>
          <span @click="goToTheRouter(item)">{{ item.title }}</span>
        </a-menu-item>
        <LoopSubmenu v-else :key="item.key" :menuInfo="item">
        </LoopSubmenu>
      </template>
    </a-menu>
  </div>
</template>

<script>
  import LoopSubmenu from "@/components/LoopSubmenu"

  export default {
    components: {
      LoopSubmenu
    },
    data() {
      return {
        menuList: [
          {
            key: '1',
            title: '系统设置',
            path: '/index/setting',
            children: [
              {
                key: '2.1',
                title: '角色管理',
                path: '/index/setting/userRole'
              },
              {
                key: '2.2',
                title: '编制管理',
              }
            ]
          },
          {
            key: '2',
            title: '财务管理',
            children: [
              {
                key: '2.2',
                title: '出账',
                children: [
                  {
                    key: '2.2.1',
                    title: '现金'
                  },
                  {
                    key: '2.2.2',
                    title: '网币',
                    children: [
                      {
                        key: '2.2.2.1',
                        title: "支付宝",
                      },
                      {
                        key: '2.2.2.2',
                        title: "微信",
                      },
                    ]
                  }
                ],
              },
              {
                key: '2.1',
                title: '入账',
                children: [
                  {
                    key: '2.1.1',
                    title: '现金'
                  },
                  {
                    key: '2.1.2',
                    title: '网币',
                    children: [
                      {
                        key: '2.1.2.1',
                        title: "支付宝",
                      },
                      {
                        key: '2.1.2.2',
                        title: "微信",
                      },
                    ]
                  }
                ],
              },
            ],
          },
          {
            key: '3',
            title: '线上考试',
            children: [
              {
                key: '3.1',
                title: '题库管理',
                children: [
                  {
                    key: '3.1.1',
                    title: '题目列表'
                  }
                ]
              },
              {
                key: '3.2',
                title: '试卷管理',
              }
            ]
          },
        ],
      };
    },
    methods: {
      goToTheRouter(item) {
        console.log("点击了路由")
        if (item.path) {
          this.$router.push(item.path)
        }
      }
    },
  };
</script>
