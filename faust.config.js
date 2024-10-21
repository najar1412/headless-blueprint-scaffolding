import { setConfig } from "@faustwp/core";
import templates from "./src/wp-templates";
import possibleTypes from "./src/possibleTypes.json";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
  possibleTypes,
});
