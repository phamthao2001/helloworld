<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    style="
      height: 100vh;
      overflow: scroll;
      position: relative;
      text-align: center;
    "
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
        <i
          class="fa-solid fa-house-user"
          style="
            font-size: 25px;
            bottom: 40px;
            color: white;
            left: 25px;
            margin-top: 15px;
            cursor: pointer;
          "
          @click="homeback"
        ></i>
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
      <div @click="pdfClick()">
        <a-row class="typeexport">
          <a-col span="6"><i class="fa-solid fa-file-pdf"></i></a-col>
          <a-col span="6">PDF</a-col>
        </a-row>
      </div>

      <div @click="csvClick()">
        <a-row class="typeexport">
          <a-col span="6"><i class="fa-solid fa-file-csv"></i></a-col>
          <a-col span="6">Excel</a-col>
        </a-row>
      </div>

      <a-divider>History</a-divider>
      <a-row> </a-row>
      <a-list
        item-layout="horizontal"
        :data-source="this.$store.getters.getHistoryApp"
      >
        <a-list-item class="history" slot="renderItem" slot-scope="item, index">
          <a-row type="flex">
            <a-col style="color: black" @click="redirect(item)">{{
              index + 1 + ":  " + item
            }}</a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </a-drawer>
    <a-modal v-model="pdf" title="Export PDF">
      <p>Enter PDF file name in the space</p>
      <a-input addon-after=".pdf" v-model="nameExport">
        <a-icon slot="addonBefore" type="file-text" />
      </a-input>
      <a-row slot="footer">
        <a-button @click="pdf = fasle">Cancel</a-button>
        <a-button
          :disabled="lengthNameExport()"
          type="primary"
          @click="exportPDF()"
          >Export</a-button
        >
      </a-row>
    </a-modal>
    <a-modal v-model="csv" title="Export CSV">
      <p>Enter CSV file name in the space</p>
      <a-input addon-after=".csv" v-model="nameExport">
        <a-icon slot="addonBefore" type="file-text" />
      </a-input>
      <a-row slot="footer">
        <a-button @click="csv = fasle">Cancel</a-button>
        <a-button
          :disabled="lengthNameExport()"
          type="primary"
          @click="exportCSV()"
          >Export</a-button
        >
      </a-row>
    </a-modal>
  </a-layout-sider>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      text: "",
      collapsed: true,
      visible: false,
      pdf: false,
      csv: false,
      nameExport: this.$route.params.country ? this.$route.params.country : "",
    };
  },
  watch: {
    $route: function (from) {
      this.nameExport = from.params.country;
    },
  },
  computed: {
    getdata() {
      if (this.text.length > 0) {
        return this.$store.state.country.filter(
          (obj) =>
            obj.nameiso.name.toLowerCase().indexOf(this.text.toLowerCase()) >= 0
        );
      } else {
        return this.$store.state.country;
      }
    },
  },
  methods: {
    homeback() {
      this.$router.push("/");
      this.$store.commit("setFocusCountry", {});
    },
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
    redirect(item) {
      if (this.$route.params.country !== item) this.$router.push(`/${item}`);
    },
    pdfClick() {
      this.visible = false;
      this.pdf = true;
    },
    csvClick() {
      this.visible = false;
      this.csv = true;
    },
    lengthNameExport() {
      return this.nameExport.length === 0;
    },
    exportPDF() {
      var ex = this.nameExport + ".pdf";
      console.log(
        document.querySelector("#content").clientWidth,
        document.querySelector("#content").clientHeight
      );
      html2canvas(document.querySelector("#content"), {
        allowTaint: true,
        useCORS: true,
        scale: 1,
      }).then((canvas) => {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF("p", "px", [
          document.querySelector("#content").clientWidth + 100,
          document.querySelector("#content").clientHeight + 250,
        ]);

        doc.addImage(
          img,
          "PNG",
          5,
          20,
          document.querySelector("#content").clientWidth,
          document.querySelector("#content").clientHeight
        );
        doc.save(ex);
      });
    },
    exportCSV() {
      var wb = XLSX.utils.book_new();
      var ws1 = XLSX.utils.aoa_to_sheet(
        this.$store.getters.getFocusCountryData
      );
      var ws2 = XLSX.utils.aoa_to_sheet(this.$store.getters.getHisCase);
      var ws3 = XLSX.utils.aoa_to_sheet(this.$store.getters.getHisDeath);
      XLSX.utils.book_append_sheet(wb, ws1, "Thông tin quốc gia");
      XLSX.utils.book_append_sheet(wb, ws2, "Lịch sử các ca nhiễm");
      XLSX.utils.book_append_sheet(wb, ws3, "Lịch sử các ca tử vong");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(data, this.nameExport + ".xlsx");
    },
  },
  created: async function () {
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
  cursor: pointer;
}
.typeexport {
  font-size: 19px;
  color: black;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.typeexport:hover {
  background: rgb(216, 216, 216);
}
li.item {
  cursor: pointer;
}
.history {
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
}
.history:hover {
  background: rgb(216, 216, 216);
}
::-webkit-scrollbar {
  display: none;
}
</style>
