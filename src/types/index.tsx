export interface RoutesProps {
  path: string,
  name: string,
  component: React.ComponentType<{}>
}

export interface MenuProps {
  name: string,
  slug: string,
  icon: string
}

export interface UserProps {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export interface PersonalProps {
  name: string,
  slug: string,
  icon: string
}

export interface HomeSection {
  bannerProportion?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: {
    contentType: string;
    id: number;
    imageUrl: string;
    jumpAddress: string;
    jumpType: string;
    needLogin: boolean;
    resourceNum?: any;
    resourceStatus?: any;
    showMark: boolean;
    title: string;
  }[];
}