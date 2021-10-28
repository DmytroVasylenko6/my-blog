export interface ITask {
  completed: boolean;
  _id: string | number;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface IParseTask {
  data: ITask[];
}

export interface IDataTask {
  data: ITask;
}

export interface INewTask {
  description: string;
}
