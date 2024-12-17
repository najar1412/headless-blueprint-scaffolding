import { setConfig } from "@faustwp/core";
import templates from "./src/wp-templates";
import possibleTypes from "./src/possibleTypes.json";

import { RelayStylePaginationPlugin } from "./plugins/RelayStylePagination";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  plugins: [new RelayStylePaginationPlugin()],
  possibleTypes,
});
