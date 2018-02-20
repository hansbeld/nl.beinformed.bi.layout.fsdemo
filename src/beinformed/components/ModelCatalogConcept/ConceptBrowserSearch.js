// @flow
import React, { Component } from "react";

import { withMessage, Message } from "beinformed/containers/I18n/Message";
import withModularUI from "beinformed/utils/modularui/withModularUI";

import ConceptLink from "beinformed/components/ConceptLink/ConceptLink";
import TextInput from "beinformed/components/FormInput/TextInput";

import "./ConceptBrowserSearch.scss";

import type ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

type ConceptBrowserSearchProps = {
  message: messageFunctionType,
  modularui: Function,
  conceptIndex: ConceptIndexModel,
  startProgress: () => void,
  finishProgress: () => void
};

type ConceptBrowserSearchState = {
  searchTerm: string,
  searchResult: ConceptIndexModel | null,
  showResult: boolean
};

/**
 * Entry date for modelcatalog
 */
class ConceptBrowserSearch extends Component<
  ConceptBrowserSearchProps,
  ConceptBrowserSearchState
> {
  constructor(props: ConceptBrowserSearchProps) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResult: null,
      showResult: true
    };
  }

  /**
   * componentDidMount, sets a click handler on the document to hide search results when document is clicked
   */
  componentDidMount() {
    window.addEventListener("click", this.handleDocumentClick);
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      this.setState({
        showResult: e.target.id === "searchTerm"
      });
    }
  };

  handleSearch(value) {
    const {
      conceptIndex,
      startProgress,
      finishProgress,
      modularui
    } = this.props;

    this.setState({
      searchTerm: value
    });

    if (conceptIndex.searchtermfilter) {
      const searchAttribute = conceptIndex.searchtermfilter.attribute;
      const searchHref = conceptIndex.selfhref;

      searchHref.parameters = searchHref.parameters.filter(
        parameter => parameter.name === "entryDate"
      );
      searchHref.addParameter(searchAttribute.name, value);

      startProgress();
      modularui(searchHref)
        .fetch()
        .then(result => {
          this.setState({
            searchResult: result
          });

          finishProgress();
        });
    }
  }

  /**
   * @overwrite
   */
  render() {
    const { message } = this.props;

    return (
      <div className="modelcatalog-search">
        <TextInput
          name="searchTerm"
          value={this.state.searchTerm}
          placeholder={message(
            "ModelCatalogSearch.Placeholder",
            "Search concept by label"
          )}
          onChange={value => this.handleSearch(value)}
        />
        {this.state.searchResult &&
          this.state.showResult &&
          this.state.searchTerm !== "" && (
            <div className="modelcatalog-search-result">
              <ul className="nav flex-column mb-1">
                {this.state.searchResult.items.isEmpty && (
                  <li className="nav-item modelcatalog-search-result-item">
                    <Message
                      id="ModelCatalogSearch.NoResults"
                      defaultMessage="No concepts found"
                    />
                  </li>
                )}
                {this.state.searchResult.items.all.map((concept, idx) => (
                  <li
                    key={`${concept.key}-${idx}`}
                    className="nav-item modelcatalog-search-result-item"
                  >
                    <ConceptLink concept={concept} />
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

export default withModularUI(withMessage(ConceptBrowserSearch));
