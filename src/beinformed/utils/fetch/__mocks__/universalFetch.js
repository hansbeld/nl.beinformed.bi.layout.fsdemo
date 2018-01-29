/* global process */
const responseMap = {
  "/BeInformed/routeprovider/": {
    "/": {
      viewtype: "Application",
      resources: [
        {
          webapplication: "/"
        }
      ]
    }
  },
  "/BeInformed/routeprovider/books": {
    "/books": {
      viewtype: "CaseTab",
      resources: [
        {
          tab: "/books"
        }
      ]
    },
    "/": {
      viewtype: "Application",
      resources: [
        {
          webapplication: "/"
        }
      ]
    }
  },
  "/BeInformed/routeprovider/books/books": {
    "/books/books": {
      viewtype: "CaseList",
      resources: [
        {
          Books: "/books/books"
        }
      ]
    },
    "/books": {
      viewtype: "CaseTab",
      resources: [
        {
          tab: "/books"
        }
      ]
    },
    "/": {
      viewtype: "Application",
      resources: [
        {
          webapplication: "/"
        }
      ]
    }
  },
  "/BeInformed/routeprovider/books/book/24": {
    "/books/book/(book-id)": {
      viewtype: "CaseView",
      resources: [
        {
          Book: "/books/book/(book-id)"
        }
      ]
    },
    "/books": {
      viewtype: "CaseTab",
      resources: [
        {
          tab: "/books"
        }
      ]
    },
    "/": {
      viewtype: "Application",
      resources: [
        {
          webapplication: "/"
        }
      ]
    }
  },
  "/BeInformed/routeprovider/concepts/Persons/Knowledge model/Taxonomy.bixml/Belgium": {
    "/concepts/(knowledge-model-identifier)/(concept-identifier)": {
      viewtype: "ConceptDetail",
      resources: [
        {
          ConceptDetail:
            "/concepts/(knowledge-model-identifier)/(concept-identifier)"
        }
      ]
    },
    "/concepts": {
      viewtype: "ConceptSearch",
      resources: [
        {
          concepts: "/concepts"
        }
      ]
    },
    "/": {
      viewtype: "Application",
      resources: [
        {
          webapplication: "/"
        }
      ]
    }
  }
};

/**
 * Universal Fetch mock
 * @param  {Object} args Arguments
 * @return {Promise}
 */
export default function universalFetch(args) {
  return new Promise((resolve, reject) => {
    const url = args.url.replace("?includeContext=true", "");

    process.nextTick(() => {
      if (responseMap[url]) {
        return resolve(responseMap[url]);
      }

      return reject(new Error(`url : ${url} not found`));
    });
  });
}
