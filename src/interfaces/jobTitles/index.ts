export interface IJobTitleCreate {
  name: string;
  description: string;
}

export interface IJobTitle extends IJobTitleCreate {
  id: number;
}

export interface IJobTitleUpdateAssign {
  name?: string;
  description?: string;
}

export interface IJobTitleUpdate {
  id: string;
  name?: string;
  description?: string;
}
