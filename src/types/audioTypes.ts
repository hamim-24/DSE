export interface AudioCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface AudioContent {
  id: string;
  title: string;
  duration: number; // in seconds
  points: number;
  description: string;
  audioUrl: string;
}

export interface IVRMenuOption {
  [key: string]: string;
}

export interface IVRSubMenu {
  prompt: string;
  options: IVRMenuOption;
}

export interface IVRMenuStructure {
  mainMenu: {
    prompt: string;
    options: IVRMenuOption;
  };
  subMenus: {
    [key: string]: IVRSubMenu;
  };
}

export interface CompletedAudio {
  id: string;
  title: string;
  category: string;
  completedAt: string;
  points: number;
}
