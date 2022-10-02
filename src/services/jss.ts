import { create as createJss } from 'jss'
import preset from 'jss-preset-default'

const jss = createJss(preset())

export { jss }
