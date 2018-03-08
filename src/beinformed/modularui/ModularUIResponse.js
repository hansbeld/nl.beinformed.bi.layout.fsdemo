// @flow
import type Parameter from "beinformed/models/href/Parameter";

class ModularUIResponse<Data: any, Contributions: any> {
  _key: string;
  _data: Data;
  _contributions: Contributions;
  _locale: string;
  _parameters: Array<Parameter>;

  constructor() {
    this._data = {};
    this._contributions = {};
    this._key = "unknown";
    this._locale = "EN";
    this._parameters = [];
  }

  set locale(locale: string) {
    this._locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  set key(key: string) {
    this._key = key;
  }

  get key(): string {
    return this._key;
  }

  set data(data: Data) {
    this._data = data;
  }

  get data(): Data {
    return this._data;
  }

  set contributions(contributions: Contributions) {
    this._contributions = contributions;
  }

  get contributions(): Contributions {
    return this._contributions;
  }

  set parameters(parameters: Array<Parameter>) {
    this._parameters = parameters;
  }

  get parameters(): Array<Parameter> {
    return this._parameters;
  }
}

export default ModularUIResponse;
