<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    style="height: 100vh; overflow: scroll; position: relative; text-align:center;"
    width="200px"
    collapsedWidth="80px"
  >
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      style="
        color: white;
        font-size: 25px;
        margin-top: 10px;
        margin-bottom: 10px;
      "
      @click="() => (collapsed = !collapsed)"
    />
    <div v-if="!collapsed">
      <a-input v-model="text" placeholder="Điền tên nước">
        <i slot="prefix" class="fa-solid fa-globe"></i>

        <a-tooltip slot="suffix" title="Country Hint">
          <i class="fa-solid fa-magnifying-glass"></i>
        </a-tooltip>
      </a-input>
      <a-list item-layout="horizontal" :data-source="getdata">
        <a-list-item
          class="item"
          slot="renderItem"
          slot-scope="item"
          @click="focusCountry(item)"
        >
          <a-list-item-meta>
            <p slot="title" style="color: white">{{ item.nameiso.name }}</p>
            <a-avatar
              slot="avatar"
              :src="`https://countryflagsapi.com/png/${item.nameiso.iso}`"
              style="margin-left: 10px"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div v-else style="margin-bottom: 10px">
      <div v-if="this.$store.state.focusCountry.nameiso">
        <a-avatar
          :src="`https://countryflagsapi.com/png/${this.$store.state.focusCountry.nameiso.iso}`"
          style="margin-bottom: 10px"
        />
        <div style="color: white">
          {{ this.$store.state.focusCountry.nameiso.name }}
        </div>
      </div>

      <div v-else>
        <i
          class="fa-solid fa-earth-asia"
          :style="{ color: 'white', fontSize: '25px' }"
        ></i>
        <div style="color: white; margin-top: 10px">Global</div>
      </div>
    </div>
    <i
      v-if="collapsed && this.$store.state.focusCountry.nameiso"
      class="fa-solid fa-file-export export"
      @click="showDrawer"
    ></i>
    <a-drawer
      title="Export File"
      placement="right"
      :closable="false"
      :visible="visible"
      
      @close="onClose"
    >
      <p>PDF</p>
      <p>Excel</p>
    </a-drawer>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      collapsed: true,
      visible: false,
    };
  },
  computed: {
    getdata() {
      if (this.text.length > 0) {
        return this.$store.state.country.filter(
          (obj) => obj.name.toLowerCase().indexOf(this.text.toLowerCase()) >= 0
        );
      } else {
        return this.$store.state.country;
      }
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    focusCountry(data) {
      this.$store.commit("setFocusCountry", data);
      this.collapsed = !this.collapsed;
      this.text = "";
      this.$router.push(`/${this.$store.state.focusCountry.nameiso.name}`);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  created: function () {
    this.$store.dispatch("getCountry");
  },
};
</script>

<style scoped>
.export {
  position: absolute;
  font-size: 25px;
  bottom: 40px;
  color: white;
  left: 25px;
}

li.item {
  cursor: pointer;
}
::-webkit-scrollbar {
  display: none;
}
</style>
