import { relayStylePagination } from "@apollo/client/utilities";

export class RelayStylePaginationPlugin {
  apply(hooks) {
    const { addFilter } = hooks;

    addFilter("apolloClientInMemoryCacheOptions", "faust", (options) => {
      return {
        ...options,
        typePolicies: {
          ...options.typePolicies,
          RootQuery: {
            ...options.typePolicies.RootQuery,
            fields: {
              posts: relayStylePagination(),
            },
          },
          ContentType: {
            fields: {
              contentNodes: relayStylePagination(),
            },
          },
        },
      };
    });
  }
}
