<template>
  <div class="index">
    <el-row>
      <el-col :span="7"
        ><div
          class="left"
          @dragstart="dragStart"
          @dragend="dragEnd"
          @drag="drag"
        >
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
              <template slot="title"> <span>基础组件</span> </template>
              <el-row :gutter="30" style="padding: 0 1vmin">
                <el-col
                  :span="8"
                  draggable
                  v-for="(item, key) of typeList"
                  :key="key"
                  :data-type="item.type"
                  ><i :class="item.icon"></i>
                  <p>{{ item.name }}</p></el-col
                >
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title"> <span>基础组件</span> </template>
              <el-row :gutter="30" style="padding: 0 1vmin">
                <el-col
                  :span="8"
                  draggable
                  v-for="(item, key) of typeList"
                  :key="key"
                  :data-type="item.type"
                  ><i :class="item.icon"></i>
                  <p>{{ item.name }}</p></el-col
                >
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div></el-col
      >
      <el-col :span="10"
        ><div class="middle">
          <div
            class="edit-area"
            droppable
            @drop="drop"
            @dragover="dragover"
            @dragenter="dragenter"
            @dragleave="dragleave"
          >
            <component
              v-for="(item, key) of choosedList"
              :key="key"
              :is="item.type"
              :data-index="key"
            />
          </div></div
      ></el-col>
      <el-col :span="7"
        ><div class="right">
          {{ choosedList }}
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {
    inputType: () => import("@/components/type/input.vue"),
    selectType: () => import("@/components/type/select.vue"),
    imgType: () => import("@/components/type/img.vue"),
    position: () => import("@/components/type/position.vue"),
  },
  data() {
    return {
      itemData: [],
      choosedList: [],
      typeList: [
        {
          name: "输入框类型",
          icon: "el-icon-edit",
          type: "inputType",
        },
        {
          name: "图片",
          icon: "el-icon-star-off",
          type: "imgType",
        },
        {
          name: "下拉框",
          icon: "el-icon-zoom-out",
          type: "selectType",
        },
        {
          name: "九宫格",
          icon: "el-icon-plus",
          type: "nine",
        },
      ],
      activeName: "1",
      typeNow: "",
      index: -1,
      direction: Boolean,
    };
  },
  watch: {
    index(a) {
      console.log(a, "变了", typeof a);
      this.deletePosition();
      this.choosedList.splice(this.index, 0, {
        type: "position",
      });
    },
  },
  methods: {
    deletePosition() {
      let havePosition = this.choosedList.findIndex(
        (item) => item.type == "position"
      );
      if (havePosition != -1) {
        this.choosedList.splice(
          this.choosedList.findIndex((item) => item.type == "position"),
          1
        );
      }
    },
    dragStart(e) {
      this.typeNow = e.target.dataset.type;
    },
    drag() {},
    dragEnd() {},
    drop() {
      this.deletePosition();
      this.choosedList.splice(this.index, 0, {
        type: this.typeNow,
      });
    },
    dragover(e) {
      e.preventDefault();
      let havePosition = this.choosedList.findIndex(
        (item) => item.type == "position"
      );
      if (e.target.className == "edit-area") {
        if (havePosition == "-1") {
          this.choosedList.push({
            type: "position",
          });
        }
      } else {
        if (e.target.className == "position") {
          return false;
        } else {
          this.direction = e.offsetY < e.target.offsetHeight / 2;
          if (this.direction) {
            this.index = Number(e.target.dataset.index);
            console.log(this.index);
          } else {
            this.index = Number(e.target.dataset.index) + 1;
            console.log(this.index);
          }
        }
      }
    },
    dragenter() {},
    dragleave() {},
  },
  mounted(){
    setInterval(()=>{
      this.$axios.get('http://172.16.1.79:6700/castApp/getv').then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },3000)
  }
  
};
</script>

<style lang="scss" scoped>
.index {
  .left {
    text-align: center;
    border-right: 1px solid rgb(190, 190, 190);
    height: 100vmin;
    .el-collapse {
      .el-collapse-item {
        span {
          padding-left: 3vmin;
        }
        .el-row {
          .el-col {
            padding-top: 2vmin;
            i {
              font-size: 3vmin;
            }
            p {
              font-size: 1vmin;
            }
          }
        }
      }
    }
  }
  .middle {
    height: 100vmin;
    background-color: rgb(241, 241, 241);
    .edit-area {
      width: 60%;
      height: 100%;
      background-color: #fff;
      margin: 0 auto;
    }
  }
  .right {
    height: 100vmin;
    border-left: 1px solid rgb(190, 190, 190);
  }
}
</style>
