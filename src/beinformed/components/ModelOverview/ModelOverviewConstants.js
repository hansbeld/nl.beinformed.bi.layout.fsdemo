export const BUSINESS_MODEL_OVERVIEW_CONCEPT_TYPES = [
  {
    role: {
      id: "Role",
      conceptTypes: [
        "/Library/KMTs/Interaction.bixml/UserRole",
        "/Library/KMTs/Interaction.bixml/OrganizationRole",
        "/Library/KMTs/Interaction.bixml/ExternalSystem"
      ]
    }
  },
  {
    channel: {
      id: "Channel",
      conceptTypes: [
        "/Library/KMTs/Interaction.bixml/Portal",
        "/Library/KMTs/Interaction.bixml/Service",
        "/Library/KMTs/Interaction.bixml/OtherChannel"
      ]
    }
  },
  {
    product: {
      id: "Product",
      conceptTypes: ["/Library/KMTs/Products.bixml/Product"]
    }
  },
  {
    case: {
      id: "Case",
      conceptTypes: ["/Library/KMTs/Case Management.bixml/Case"]
    }
  },
  {
    register: {
      id: "Register",
      conceptTypes: ["/Library/KMTs/Registration.bixml/Register"]
    }
  }
];

export const TARGET_OPERATING_MODEL_CONCEPT_TYPES = [
  {
    context: {
      id: "CustomerSegment",
      conceptTypes: [
        "/Library/KMTs/Business architecture.bixml/CustomerSegment",
        "/Library/KMTs/Interaction.bixml/Role",
        "/Library/KMTs/Interaction.bixml/UserRole",
        "/Library/KMTs/Interaction.bixml/OrganizationRole",
        "/Library/KMTs/Interaction.bixml/ExternalSystem"
      ]
    }
  },
  {
    interaction: {
      id: "InteractionChannel",
      conceptTypes: [
        "/Library/KMTs/Business architecture.bixml/InteractionChannel",
        "/Library/KMTs/Interaction.bixml/Portal",
        "/Library/KMTs/Interaction.bixml/Service",
        "/Library/KMTs/Interaction.bixml/OtherChannel"
      ]
    }
  },
  {
    products: {
      id: "ProductFamily",
      conceptTypes: [
        "/Library/KMTs/Business architecture.bixml/ProductFamily",
        "/Library/KMTs/Products.bixml/Product"
      ]
    }
  },
  {
    shared: {
      id: "SharedPolicy",
      conceptTypes: ["/Library/KMTs/Business architecture.bixml/SharedPolicy"]
    }
  },
  {
    businessfunctions: {
      id: "BusinessFunction",
      conceptTypes: [
        "/Library/KMTs/Business architecture.bixml/BusinessFunction",
        "/Library/KMTs/Case Management.bixml/Case"
      ]
    }
  },
  {
    register: {
      id: "RegistrationFunction",
      conceptTypes: [
        "/Library/KMTs/Business architecture.bixml/RegistrationFunction",
        "/Library/KMTs/Registration.bixml/Register"
      ]
    }
  }
];
