export class SignedInUserDTO
{
    appUserId: number;
    corpUserId: number
    email: string;
    displayName: string;
    firstName: string;
    lastName: string;
    roleId: string;
    roleName: string;
    initial: string;
    thumbnailPhoto: string;
    hasThumbnailPhoto: string;
    canViewDailySchedule: string;
}

export class UserDTO
{
    corpID : string;
    email :string;
    phone : string;
    fullName : string;
    displayName :string;
    givenName :string;
    surname :string;
    samaAccountName :string;
    physicalDeliveryOfficeName :string;
    employeeType :string;
    employeeId :string;
    employeeNumber :string;
    title :string;
    department :string;
    division :string;
    manager :string;
    managerDisplayName :string;
    managerEmail :string;
    managerCorpID :string;
    thumbnailPhoto :string;
    userRoleId :number;
    createdBy :string;
    createdDate:Date;
}

export class UserAssignRoleDTO
{    
    UserRoleId: number;
}
