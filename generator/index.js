import { catch_errors } from './utils'
import generate_Env from './environment/generate_Env.js'
import generate_Theme from './theme/generate_Theme.js'

catch_errors(generate_Env)()
catch_errors(generate_Theme)()
