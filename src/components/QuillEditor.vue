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
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: 1 }, { header: 2 }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
      ],
    }
  },
  computed: {
    content: {
      // getter
      get() {
        return this.title
      },

      // setter
      set(newValue) {
        this.handleInput(newValue)
      },
    },
  },
  methods: {
    handleInput(newValue) {
      this.$emit('update:title', newValue)
    },
  },
}
</script>

<style scoped>
* >>> .quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 1.8px;
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
