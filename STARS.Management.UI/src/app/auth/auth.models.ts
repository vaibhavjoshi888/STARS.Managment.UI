export class Auth {
}

export class LoginCredential {
    emailAddress: string;
    password: string;
  }

  export class ResetCredential extends LoginCredential {
    resetCode: string;
  }
  
  export class Registration {
    emailAddress: string;
    knownAs: string;
    fullName: string;
    workplaceName: string;
    positionTitle: string;
    telephone: string;
  }
  
  export class LoginResponse {
    authenticationToken: string;
    authenticationTokenExpiry: string; // isn't binding to Date ???
  }

  export class ResetResponse {
    actionStatus: number
  }


  // have to careful that this does not expand to big... JWT can't handle everything and this is the primary source here
  export class UserInfo {
    userId: string;
    knownAs: string;
    fullName: string;
    securityRole: SecurityRoleEnum;
    whenCurrentLogin: string;
    whenPreviousLogin: string;
    profile: UserProfile;  
  }
  
  export class UserProfile {
    highestSecurityRole: SecurityRoleEnum;
    isSystemAdmin: boolean;
    emailAddress: string;
  }

  export enum SecurityRoleEnum {
    NoAccess,
    OrganisationUser,
    OrganisationAdministrator,
    SystemAdministrator,
  }

  export enum SecurityVisibilityEnum {
    NoAccess,
    ReadOnly,
    Editable
  }
  
