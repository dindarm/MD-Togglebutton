<template>
  <div>

    <md-toggle-button v-model="vmm" :labels="{checked: 'Yes', unchecked: 'No'}" :color="{
          checked: '#F9A825',
          unchecked: '#c62828',
          disabled: '#CCCCCC'
        }" :width="60" :sync="true" :height="30" :fontSize="12" />
  </div>
  <div>
    {{vmm}}
  </div>

  <div>
    <input type="checkbox" v-model="vmm" />
  </div>

</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'
import MdToggleButton from './components/MdToggleButton/MdToggleButton.vue'

export default defineComponent({
  name: 'App',
  components: {
    MdToggleButton
  },
  setup () {
    const vmm = ref(true)
    return {
      vmm
    }
  }
})

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
