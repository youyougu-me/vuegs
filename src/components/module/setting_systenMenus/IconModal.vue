<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal with customized footer
    </a-button>
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Return
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        visible: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        this.loading = true;
        setTimeout(() => {
          this.visible = false;
          this.loading = false;
        }, 3000);
      },
      handleCancel(e) {
        this.visible = false;
      },
    },
  };
</script>