declare type ErrorResponseJSON =
  | GeneralErrorJSON
  | NotAuthorizedJSON
  | UnsupportedOperationJSON
  | ResourceNotFoundJSON
  | AcceptHeaderRequiredJSON
  | InvalidRequestJSON
  | SpecificErrorsJSON
  | LoginRedirectServletErrorResponse
  | ChangePasswordJSON;

declare type GeneralErrorJSON = {
  error: {
    id: "GENERAL_ERROR",
    parameters: {
      type: string
    }
  }
};

declare type NotAuthorizedJSON = {
  error: {
    id: "NOT_AUTHORIZED"
  }
};

declare type UnsupportedOperationJSON = {
  error: {
    id: "UNSUPPORTED_OPERATION",
    parameters: {
      message: string
    }
  }
};

declare type ResourceNotFoundJSON = {
  error: {
    id: "RESOURCE_NOT_FOUND"
  }
};

declare type AcceptHeaderRequiredJSON = {
  error: {
    id: "ACCEPT_HEADER_REQUIRED"
  }
};

declare type InvalidRequestJSON = {
  error: {
    id: "FORM_QUESTION_OBJECT_NOT_ALLOWED" | "FORM_QUESTION_OBJECT_UNKNOWN",
    parameters: {
      objectid: string
    }
  }
};

declare type SpecificErrorsJSON = {
  error: {
    id: string,
    parameters: {
      message: string
    }
  }
};

declare type ChangePasswordJSON = {
  error: {
    id: "Error.ChangePasswordRequired",
    properties: {
      redirect: string
    }
  }
};

declare type LoginRedirectServletErrorResponse = {
  error: {
    id: string,
    action: {
      name: "login",
      title: "login",
      method: "POST",
      href: string,
      fields: [
        {
          name: "username",
          type: "string"
        },
        {
          name: "password",
          type: "string"
        }
      ]
    }
  }
};
