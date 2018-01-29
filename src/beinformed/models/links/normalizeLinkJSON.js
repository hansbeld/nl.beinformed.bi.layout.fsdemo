// @flow
import type {
  LinkCollectionJSON,
  LinkCollectionContributionsJSON
} from "beinformed/models/links/LinkCollection";

/**
 * Flatten JSON structure into a one dimensional array
 */
const flattenDataJSON = (json: LinkCollectionJSON): Array<LinkJSON> => {
  const flattenedJSON = [];

  Object.keys(json).forEach(linkKey => {
    if (Array.isArray(json[linkKey])) {
      flattenedJSON.push(
        ...json[linkKey].map(link => {
          const newLink = link;
          newLink.group = linkKey;
          return newLink;
        })
      );
    } else if (json[linkKey]) {
      flattenedJSON.push(
        Object.assign(json[linkKey], {
          name: linkKey
        })
      );
    }
  });

  return flattenedJSON;
};

const flattenContributionsJSON = (
  json: LinkCollectionContributionsJSON
): Array<LinkContributionsJSON> => {
  const flattenedJSON = [];

  Object.keys(json).forEach(linkKey => {
    if (Array.isArray(json[linkKey])) {
      flattenedJSON.push(
        ...json[linkKey].map(link => {
          const newLink = link;
          newLink.group = linkKey;
          return newLink;
        })
      );
    } else if (json[linkKey]) {
      const newLink = json[linkKey];
      newLink.name = linkKey;
      if (!newLink.label) {
        newLink.label = linkKey;
      }
      if (!newLink.group) {
        newLink.group = linkKey;
      }

      flattenedJSON.push(newLink);
    }
  });

  return flattenedJSON;
};

/**
 * Normalize various link formats from services into a concistent format
 */
type normalizeLinkType = Array<{
  data: LinkJSON,
  contributions: LinkContributionsJSON
}>;

const normalizeLinkJSON = (
  data?: LinkCollectionJSON,
  contributions?: LinkCollectionContributionsJSON
): normalizeLinkType => {
  if (!data && !contributions) {
    return [];
  }

  const flattenedData = data ? flattenDataJSON(data) : [];
  const flattenedContributions = contributions
    ? flattenContributionsJSON(contributions)
    : [];

  const filteredContributions = flattenedContributions.filter(
    contribution =>
      contribution.href &&
      !flattenedData.find(linkData => linkData.name === contribution.name)
  );

  return [
    ...flattenedData.map(link => ({
      data: link,
      contributions: flattenedContributions.find(
        contr => contr.name === link.name
      ) || { name: link.name, label: link.name || "" }
    })),
    ...filteredContributions.map(link => ({
      data: {
        ...link,
        href: link.href || ""
      },
      contributions: { name: link.name, label: link.name || "" }
    }))
  ];
};

export default normalizeLinkJSON;
