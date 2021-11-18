<template>
  <vue-editor
    id="editor"
    v-model="content"
    :editor-toolbar="customToolbar"
    use-custom-image-handler
    @input="handleInput"
    @image-added="handleImageAdded"
    @image-removed="handleImageRemoved"
  />
</template>

<script>
import axios from 'axios'
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
        ['image'],
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
    handleImageAdded(file, Editor, cursorLocation) {
      console.log('test')
      const CLIENT_ID = 'cd31c73bfa7296a896481939f8dcc165'
      const formData = new FormData()
      formData.append('image', file)
      axios({
        url: `https://api.imgbb.com/1/upload?expiration=600&key=${CLIENT_ID}`,
        method: 'POST',
        data: formData,
      })
        .then(result => {
          console.log(result)
          const url = result.data.data.display_url
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleImageRemoved(image) {
      console.log(image)
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
