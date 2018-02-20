// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";
import QuickSearchChooser from "beinformed/components/QuickSearch/QuickSearchChooser";
import QuickSearchInput from "beinformed/components/QuickSearch/QuickSearchInput";
import QuickSearchResults from "beinformed/components/QuickSearch/QuickSearchResults";

import "./QuickSearch.scss";

import type FilterModel from "beinformed/models/filters/FilterModel";
import type Href from "beinformed/models/href/Href";

type QuickSearchProps = {
  search: CaseSearchModel,
  onItemClick: (href: Href) => void,
  onQuickSearch: (
    searchModel: CaseSearchModel,
    filter: FilterModel | null,
    value: string
  ) => void,
  onSearch: (
    searchModel: CaseSearchModel,
    filter: FilterModel | null,
    value: string
  ) => void
};

type QuickSearchState = {
  showResults: boolean,
  searching: boolean,
  searchOption: FilterModel | null,
  searchValue: string
};

/**
 * Render default text field
 */
class QuickSearch extends Component<QuickSearchProps, QuickSearchState> {
  _inputGroupClick: boolean;
  _timeout: number;

  constructor(props: QuickSearchProps) {
    super(props);

    const currentFilters = props.search
      ? props.search.getQuickSearchFilters()
      : [];
    const currentOption = currentFilters.length > 0 ? currentFilters[0] : null;

    this.state = {
      showResults: false,
      searching: false,
      searchOption: currentOption,
      searchValue: ""
    };
  }

  /**
   * componentDidMount, sets a click handler on the document to hide search results when document is clicked
   */
  componentDidMount() {
    window.addEventListener("click", this.onDocumentClick);
  }

  /**
   * When component receives props, check if this is a new search form. In that case reset searchOption
   */
  componentWillReceiveProps(nextProps: QuickSearchProps) {
    const currentFilters = this.props.search
      ? this.props.search.getQuickSearchFilters()
      : [];
    const nextFilters = nextProps.search
      ? nextProps.search.getQuickSearchFilters()
      : [];
    const currentFilterName =
      currentFilters.length > 0 ? currentFilters[0].name : "";
    const nextFilterName = nextFilters.length > 0 ? nextFilters[0].name : "";

    if (currentFilterName !== nextFilterName) {
      this.setState({
        searchOption: nextFilters.length > 0 ? nextFilters[0] : null,
        searchValue: ""
      });
    } else if (this.state.searching) {
      this.setState({
        searching: false
      });
    }
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("click", this.onDocumentClick);
  }

  /**
   * Hide search results when document is clicked
   * @param  {SyntheticEvent<*>} e - event data
   */
  onDocumentClick = (e: SyntheticInputEvent<*>) => {
    if (
      this.state.searching ||
      this._inputGroupClick ||
      (e.target.nodeName === "input" &&
        e.target.className.includes("quicksearch-input"))
    ) {
      return;
    }

    this.setState({
      showResults: false
    });
  };

  /**
   * Don't hide results when search input is clicked
   */
  handleMouseUp = () => {
    this._inputGroupClick = false;
  };

  /**
   * Don't hide results when search input is clicked
   */
  handleMouseDown = () => {
    this._inputGroupClick = false;
  };

  /**
   * Change the term being searched for
   */
  handleTermChange = (inputvalue: string) => {
    const QUICKSEARCH_TIMEOUT = 120;

    this.setState({
      searchValue: inputvalue,
      showResults: true,
      searching: true
    });

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.quicksearch();
    }, QUICKSEARCH_TIMEOUT);
  };

  /**
   * Handle changed search option
   */
  handleSearchOptionChange = (option: FilterModel) => {
    const newState = {};

    if (
      this.state.searchOption !== null &&
      option.type !== this.state.searchOption.type
    ) {
      newState.searchValue = "";
    }
    newState.searchOption = this.props.search.filterCollection.getFilterByAttributeKey(
      option.attribute.key
    );
    this.setState(newState);

    if (this.state.searchValue !== "") {
      this.quicksearch();
    }
  };

  renderSearchChooser() {
    const searchOption = this.state.searchOption;
    if (
      searchOption !== null &&
      this.props.search.getQuickSearchFilters().length > 1
    ) {
      return (
        <div className="form-group quick-search-field">
          <QuickSearchChooser
            options={this.props.search.getQuickSearchFilters()}
            active={searchOption}
            onChange={this.handleSearchOptionChange}
          />
        </div>
      );
    }
    return null;
  }

  createSearchHref = () => {
    const newSearch = this.props.search.clone();

    newSearch.filterCollection.reset();
    newSearch.filterCollection.update(
      this.state.searchOption.attribute,
      this.state.searchValue
    );
    if (!newSearch.filterCollection.isValid) {
      return false;
    }

    const searchHref = newSearch.selfhref;

    searchHref.page = 1;
    searchHref.filterCollection = newSearch.filterCollection;

    return searchHref;
  };

  quicksearch = () =>
    this.props.fetchModularUI(this.createSearchHref(), { propName: "search" });

  search = () => this.props.history.push(this.createSearchHref().toString());

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const searchClass = classNames("form-inline quick-search", {
      "has-danger":
        this.state.searchOption && this.state.searchOption.attribute.inError()
    });

    if (this.props.search && this.props.search.hasQuickSearchFilters()) {
      return (
        <HTMLForm
          className={searchClass}
          method="get"
          name="quicksearch"
          action={this.props.search.selfhref}
          onSubmit={this.search}
        >
          {this.renderSearchChooser()}
          <div className="form-group quick-search-field">
            <QuickSearchInput
              searchOption={this.state.searchOption}
              value={this.state.searchValue}
              onChange={this.handleTermChange}
            />
          </div>
          {this.state.showResults && (
            <QuickSearchResults search={this.props.search} />
          )}
        </HTMLForm>
      );
    }
    return null;
  }
}

export default withRouter(QuickSearch);
