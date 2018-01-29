// @flow
import React, { Component } from "react";
import classNames from "classnames";
import filesize from "file-size";

import { withMessage, Message } from "beinformed/containers/I18n/Message";
import Icon from "beinformed/components/Icon/Icon";
import { UPLOAD_PATH, HTTP_METHODS } from "beinformed/constants/Constants";

import "./UploadInput.scss";

type UploadInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id: string,
  inError: boolean,
  isMultiple: boolean,
  message: messageFunctionType,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  uploadConstraints: {
    fileTypes: {
      extensions: string[],
      mimeTypes: string[]
    }[],
    fileSize: number
  },
  value: string,
  onBlur?: () => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type UploadInputState = {
  errormessage: string,
  files: {}
};

const MAX_PROGRESS = 100;
const MIN_PROGRESS = 0;

/**
 * Render upload input
 */
class UploadInput extends Component<UploadInputProps, UploadInputState> {
  _upload: ?HTMLDivElement;

  static defaultProps = {
    value: ""
  };

  constructor(props: UploadInputProps) {
    super(props);

    this.state = {
      errormessage: "",
      files: {}
    };
  }

  /**
   * Publish changes to the model
   */
  handleChange() {
    const tokens = Object.keys(this.state.files)
      .map(fileName => this.state.files[fileName].token)
      .join(",");

    this.props.onChange(tokens);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
   * Process upload
   */
  handleUpload = e => {
    this.uploadFiles(e.target.files);
  };

  /**
   * Handle a dropped file
   */
  handleFileDrop = e => {
    e.preventDefault();
    if (this._upload) {
      this._upload.className = "custom-file";
    }

    this.uploadFiles(e.dataTransfer.files);
  };

  /**
   * Handle a dragged file entering input
   */
  handleDragOver = e => {
    e.preventDefault();

    if (this._upload) {
      this._upload.className = "custom-file active";
    }
  };

  /**
   * Handle a dragged file leaving input
   */
  handleDragLeave = () => {
    if (this._upload) {
      this._upload.className = "custom-file";
    }
  };

  /**
   * Update file state
   * @param  {File} file - File information
   * @param  {number} progress - Bytes received as percentage of total file size
   * @param  {XMLHttpRequest} xhr - XMLHttpRequest used for upload of file
   */
  updateFileState(file, progress, xhr) {
    const files = this.state.files;

    files[file.name] = {
      xhr,
      name: file.name,
      size: file.size,
      progress
    };

    this.setState({
      files
    });
  }

  /**
   * Upload of a single file
   * @param  {File} file - File to upload
   */
  uploadFile(file) {
    const xhr = new XMLHttpRequest();

    xhr.open(HTTP_METHODS.POST, UPLOAD_PATH, true);
    xhr.setRequestHeader("x-filename", file.name);
    xhr.setRequestHeader("x-filesize", file.size);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        const progress = Math.ceil(e.loaded / e.total * MAX_PROGRESS);

        this.updateFileState(file, progress, xhr);
      }
    };

    xhr.addEventListener("load", () => {
      const files = this.state.files;

      Reflect.deleteProperty(files[file.name], "xhr");

      const responseText = xhr.response;
      let json = null;

      try {
        json = JSON.parse(responseText);
      } catch (err) {
        throw new Error("could not parse upload response to JSON");
      }

      files[file.name].token = json.token;

      this.setState({
        files
      });
      this.handleChange();
    });

    this.updateFileState(file, 0, xhr);
    xhr.send(file);
  }

  /**
   * Validate file to upload
   * @param  {File} file - File information
   * @return {boolean}
   */
  validateFile = file => {
    const REMOVE_UPLOAD_ERROR_TIMEOUT = 5000;

    const files = this.state.files;

    if (file.size > this.props.uploadConstraints.fileSize) {
      // http://xkcd.com/394/
      files[file.name] = {
        name: file.name,
        size: file.size,
        progress: -1,
        errormessage: this.props.message(
          "UploadInput.errorExceedsMaxFileSize",
          "Filesize of {ACTUAL_FILESIZE} exceeds the maximum filesize of {MAXIMUM_FILESIZE}",
          {
            ACTUAL_FILESIZE: filesize(file.size).human("si"),
            MAXIMUM_FILESIZE: filesize(
              this.props.uploadConstraints.fileSize
            ).human("si")
          }
        )
      };
    } else if (this.props.uploadConstraints.fileTypes.length > 0) {
      const fileExtension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const allowedType = this.props.uploadConstraints.fileTypes.find(
        fileType => fileType.extensions.includes(fileExtension)
      );

      if (allowedType) {
        return true;
      }
      files[file.name] = {
        name: file.name,
        size: file.size,
        progress: -1,
        errormessage: this.props.message(
          "UploadInput.errorExtensionNotAllowed",
          "File with extension {EXTENSION} is not allowed",
          {
            EXTENSION: fileExtension
          }
        )
      };

      return false;
    } else {
      return true;
    }

    this.setState({
      files
    });
    setTimeout(() => {
      this.removeUpload(file);
    }, REMOVE_UPLOAD_ERROR_TIMEOUT);

    return false;
  };

  /**
   * Upload multiple files one by one
   * @param  {FileList} files - List of files
   */
  uploadFiles(files) {
    Array.from(files).forEach(file => {
      if (this.validateFile(file)) {
        this.uploadFile(file);
      }
    });
  }

  /**
   * Remove an upload in progress or a finished upload
   * @param  {File} file - File to remove
   */
  removeUpload = file => {
    const files = this.state.files;

    if (!files[file.name]) {
      return;
    }

    if (files[file.name].xhr) {
      files[file.name].xhr.abort();
    }

    Reflect.deleteProperty(files, file.name);

    this.setState({
      files
    });
    this.handleChange();
  };

  renderFileInfo(file) {
    if (file.errormessage && file.errormessage !== "") {
      return <small className="text-danger">{file.errormessage}</small>;
    } else if (file.progress > MIN_PROGRESS && file.progress < MAX_PROGRESS) {
      return (
        <progress
          className="progress progress-animated"
          value={file.progress}
          max={MAX_PROGRESS}
        >
          {file.progress}%
        </progress>
      );
    }

    return null;
  }

  /**
   * Render file information
   */
  renderFile(file) {
    const btnIcon = classNames({
      "trash-o": file.progress === MAX_PROGRESS,
      times: file.progress > 0 && file.progress < MAX_PROGRESS,
      exclamation: file.errormessage && file.errormessage !== ""
    });

    return (
      <li className="file" key={file.name}>
        <span className="name mr-1">{file.name}</span>
        <small className="filesize">({filesize(file.size).human("si")})</small>
        <button
          className="btn btn-link btn-remove"
          onClick={() => this.removeUpload(file)}
        >
          <Icon name={btnIcon} />
          <Message
            id="UploadInput.removeFile"
            defaultMessage="Remove file"
            screenreaderOnly
          />
        </button>
        {this.renderFileInfo(file)}
      </li>
    );
  }

  /**
   * Render uploaded files
   * @return {ReactElement} markup
   */
  renderFiles() {
    if (Object.keys(this.state.files).length > 0) {
      return (
        <ul className="list-unstyled">
          {Object.keys(this.state.files).map(key => {
            const file = this.state.files[key];

            return this.renderFile(file);
          })}
        </ul>
      );
    }
    return null;
  }

  /**
   * Render file input using bootstrap custom file
   * @return {ReactElement} markup
   */
  renderInput() {
    if (this.props.isMultiple || Object.keys(this.state.files).length === 0) {
      const inputClass = classNames("form-control", "custom-file-input", {
        "is-invalid": this.props.inError
      });

      let ariaLabelledBy = null;

      if (!this.props.ariaLabel) {
        ariaLabelledBy =
          this.props.ariaLabelledBy ||
          `${this.props.id || this.props.name}-label`;
      }

      const id = this.props.id || this.props.name;

      return (
        <div
          ref={c => {
            this._upload = c;
          }}
          className="custom-file"
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleFileDrop}
        >
          <input
            type="file"
            className={inputClass}
            id={id}
            name={this.props.name}
            defaultValue={this.props.value}
            placeholder={this.props.placeholder}
            multiple={this.props.isMultiple}
            readOnly={this.props.readOnly}
            aria-label={this.props.ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-hidden="true"
            disabled={this.props.disabled}
            onChange={this.handleUpload}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <label className="custom-file-label" htmlFor={id}>
            <Message
              id="UploadField.placeholder"
              defaultMessage="Choose file..."
              screenreaderOnly
            />
          </label>
        </div>
      );
    }

    return null;
  }

  render() {
    const uploadClass = classNames("upload", this.props.className);

    return (
      <div className={uploadClass}>
        {this.renderFiles()}
        {this.renderInput()}
      </div>
    );
  }
}

export default withMessage(UploadInput);
