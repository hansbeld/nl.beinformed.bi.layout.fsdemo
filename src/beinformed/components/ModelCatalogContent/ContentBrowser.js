// @flow
import React from "react";

import { Message } from "beinformed/i18n";

import CharIndex from "beinformed/components/CharIndex/CharIndex";
import ContentLink from "beinformed/components/ContentLink/ContentLink";

import { ChoiceAttributeModel, Href } from "beinformed/models";

import type { ContentIndexModel } from "beinformed/models";

type ContentBrowserProps = {
  contentindex: ContentIndexModel,
  entryDate: string
};

const ContentBrowser = ({ contentindex, entryDate }: ContentBrowserProps) => {
  if (contentindex) {
    const indexFilterAttribute =
      contentindex.indexfilter &&
      contentindex.indexfilter.attribute instanceof ChoiceAttributeModel &&
      contentindex.indexfilter.attribute;

    return (
      <div className="content-browser catalog-index">
        <h2>
          <Message id="ContentIndex.Header" defaultMessage="Content index" />
        </h2>

        {indexFilterAttribute && (
          <div className="char-index">
            <CharIndex
              active={indexFilterAttribute.selected}
              enabled={indexFilterAttribute.options.all.map(
                option => option.code
              )}
              href={
                new Href(`/modelcatalog${contentindex.selfhref.toString()}`)
              }
            />
          </div>
        )}

        {contentindex.items.hasItems && (
          <ul className="nav flex-column mb-1 content-index-content">
            {contentindex.items.all.map((link, idx) => {
              link.entryDate = entryDate;
              return <ContentLink key={`${link.key}-${idx}`} link={link} />;
            })}
          </ul>
        )}
      </div>
    );
  }

  return null;
};

export default ContentBrowser;
