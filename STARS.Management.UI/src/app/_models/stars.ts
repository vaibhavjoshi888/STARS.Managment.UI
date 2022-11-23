export class Stars
{
    userStarId: number;
    corpUserId: string
    employeeName: string;
    message: string;
    thumbnail: string;
    createdBy: string;
    createdDate: string;
    shareCount :number;
    likeCOunt :number;
  }

  export class RcentStars
{
    userStarId: number;
    corpUserId: string
    employeeName: string;
    message: string;
    thumbnail: string;
    createdBy: string;
    createdDate: string;
    firstName: string;
    lastName: string;
  }

  export class StarsDto
{
    userStarId: string;
    corpUserId: string
    employeeName: string;
    message: string;
    thumbnail: string;
    createdBy: string;
    createdDate: string;
  }