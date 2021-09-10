<template>
  <vue-editor
    id="editor"
    v-model="content"
    :editor-toolbar="customToolbar"
    @input="handleInput"
  />
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: this.value,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: 1 }, { header: 2 }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
      ],
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content)
    },
  },
}
</script>

<style scoped>
* >>> .quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 1.8px
}

* >>> .ql-container.ql-snow {
  border: none;
}

* >>> .ql-toolbar.ql-snow {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #d1d5db;
}
</style>
