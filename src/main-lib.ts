import mdtgb from './components'

import { App } from 'vue'

const MdToggleButton = {
  install: (app: App) => {
    app.component('MdToggleButton', mdtgb)
  }
}

export default MdToggleButton
