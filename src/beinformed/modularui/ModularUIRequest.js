// @flow
import {
  HTTP_METHODS,
  TIMEVERSION_FILTER_NAME
} from "beinformed/constants/Constants";

import Href from "beinformed/models/href/Href";

import universalFetch from "beinformed/utils/fetch/universalFetch";
import resolveModel from "beinformed/models/resolveModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import type ListItemModel from "beinformed/models/list/ListItemModel";

/**
 * Helper for fetching data and contributions from the Be Informed modular ui
 * and merge it into a target or resolvable model.
 */

class ModularUIRequest {
  _response: ModularUIResponse;

  _href: Href;
  _options: Object;
  _targetModel: Class<ResolvableModels>;
  _contributionsHref: string;
  _locale: string;

  _listitem: ListItemModel;

  _progressEvent: ?Function;

  constructor(href: Href, options: Object = {}) {
    this._response = new ModularUIResponse();

    // copy request parameters to response, to be able to use them in the models
    // self links are missing the request parameters
    this._response.parameters = href.parameters;

    this.href = href;
    this.options = options;

    if (href.method === HTTP_METHODS.POST) {
      this.options = {
        ...this.options,
        method: this.options.method || HTTP_METHODS.POST
      };
    }
  }

  set locale(locale: string) {
    this._locale = locale;
    this._response.locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  setLocale(locale: string) {
    this.locale = locale;

    return this;
  }

  get response(): ModularUIResponse {
    return this._response;
  }

  set href(href: Href) {
    this._href = href;
  }

  get href(): Href {
    return this._href;
  }

  get options(): Object {
    return {
      ...this._options,
      locale: this.locale
    };
  }

  set options(options: Object) {
    this._options = options;
  }

  set listitem(listitem: ListItemModel) {
    this._listitem = listitem;
  }

  get listitem(): ListItemModel {
    return this._listitem;
  }

  get withChildModels(): boolean {
    return (
      !("childmodels" in this.options) || this.options.childmodels === true
    );
  }

  set targetModel(targetModel: Class<ResolvableModels>) {
    this._targetModel = targetModel;
  }

  get targetModel(): Class<ResolvableModels> {
    return this._targetModel;
  }

  createModel(): ResolvableModels {
    const Model = this.targetModel || resolveModel(this.response);

    if (Model && Model.isApplicableModel) {
      return new Model(this.response);
    }

    throw new Error(
      `No model available for data: ${JSON.stringify(this.response)}`
    );
  }

  processContributionsService(contributionsData: Object) {
    const contributionsKey = Object.keys(contributionsData)[0];

    if (contributionsKey === "error") {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: contributionsData.error.properties.message,
        resource: `${this.toString()}`,
        trace: contributionsData.error.properties.trace
      };
    }

    // The key of the data service is different from the contributions service for forms
    if (!(this.response.key in contributionsData)) {
      this.response.key = contributionsKey;
    }

    this.response.contributions = contributionsData[this.response.key];
  }

  processDataService(data: Object) {
    const key = Object.keys(data)[0];
    if (key === "error") {
      if (data.error.properties) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: data.error.properties.message,
          resource: `${this.href.path.toString()}`,
          trace: data.error.properties.trace
        };
      }

      throw new Error(data.error);
    }

    this.response.key = key;
    this.response.data = data[key];

    const links = data[key]._links;

    if (links && links.contributions) {
      this._contributionsHref = links.contributions.href;
    } else if (Array.isArray(links) && links[0].contributions) {
      this._contributionsHref = links[0].contributions.href;
    } else {
      throw new Error(`Contributions link not found for data with key ${key}`);
    }
  }

  fetchContributionsService() {
    return universalFetch({
      url: `${global.CONTEXT_PATH}${this._contributionsHref}`,
      cache: true,
      locale: this.options.locale
    });
  }

  fetchDataService() {
    return universalFetch({
      ...this.options,
      url: `${global.CONTEXT_PATH}${this.href.path}`,
      params: this.href.getQuerystringForModularUI(),
      onProgress: this.onProgress
    });
  }

  set onProgress(progressEvent: Function) {
    this._progressEvent = progressEvent;
  }

  get onProgress(): Function | null {
    return this._progressEvent || null;
  }

  fetch() {
    return this.fetchDataService()
      .then((data: Object) => {
        this.processDataService(data);

        return this.fetchContributionsService();
      })
      .then((contributionsData: Object) => {
        this.processContributionsService(contributionsData);

        return Promise.resolve(this.createModel());
      })
      .then(model => {
        if (this.withChildModels) {
          return this.fetchChildModels(model);
        }

        return model;
      });
  }

  fetchFromCache() {
    this.options = {
      ...this.options,
      cache: true
    };

    return this.fetch();
  }

  fetchChildModels(model: ResolvableModels): Promise<any> {
    const childModelLinks = model.getInitialChildModelLinks();

    const childModelRequests = childModelLinks.map(childModelLink => {
      const request = new ModularUIRequest(childModelLink.href);

      request.locale = this.locale;

      if (childModelLink.targetModel) {
        request.targetModel = childModelLink.targetModel;
      }

      if (childModelLink.isCacheable) {
        return request.fetchFromCache();
      }

      return request.fetch();
    });

    return Promise.all(childModelRequests.map(p => p.catch(() => null))).then(
      childModels => {
        model.addChildModels(childModels.filter(cm => cm !== null));

        return model;
      }
    );
  }

  fetchContent(withChildSections: boolean) {
    return this.fetchFromCache().then(model => {
      if (withChildSections && model.childSectionLinks.length > 0) {
        return this.fetchContentChildSections(model);
      }

      return Promise.resolve(model);
    });
  }

  /**
   * Recursively return child sections defined on the content model
   */
  fetchContentChildSections(contentModel: ContentModel): Promise<any> {
    const newContentModel = contentModel.clone();

    return Promise.all(
      contentModel.childSectionLinks.map(childSectionLink => {
        const contentHrefWithEntryDate = childSectionLink.selfhref.addParameter(
          TIMEVERSION_FILTER_NAME,
          contentModel.entryDate
        );

        const request = new ModularUIRequest(contentHrefWithEntryDate);

        return request.fetchContent(true);
      })
    ).then(sectionModels => {
      newContentModel.childSections = sectionModels;

      return newContentModel;
    });
  }
}

export default ModularUIRequest;
