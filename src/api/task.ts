import instance from '../utils/request';

/** 获取任务 */
export const getTasks = (page: number, pageSize: number, type?: string) => {
  return instance.get('/api/task', { params: { page, pageSize, type } });
};

export const getSearchTasks = (keyword: string) => {
  return instance.get('/api/task/search', { params: { keyword } });
};

/**
 * 获取任务详情
 * @param _id 任务id
 * @returns
 */
export const getTaskDetail = (_id: string) => {
  return instance.get('/api/task/detail', {
    params: { _id }
  });
};

/**
 * 添加任务
 * @param formData 任务信息
 * @returns
 */
export const createTask = (formData: FormData) => {
  return instance.post('/api/task/create', formData);
};

/**
 * 删除任务
 * @param _id 任务id
 * @returns
 */
export const deleteTask = (_id: string) => {
  return instance.post('/api/task/delete', { _id });
};

/**
 * 编辑任务
 * @param formData 任务信息
 * @returns
 */
export const editTask = (formData: FormData) => {
  return instance.post('/api/task/edit', formData);
};

/**
 * 接受任务
 * @param _id 任务id
 * @returns
 */
export const acceptTask = (_id: string) => {
  return instance.post('/api/task/accept', { _id });
};

/**
 * 放弃任务
 * @param _id 任务id
 * @returns
 */
export const giveupTask = (_id: string) => {
  return instance.post('/api/task/giveup', { _id });
};

/**
 * 完成任务
 * @param _id 任务id
 * @returns
 */
export const finishTask = (_id: string) => {
  return instance.post('/api/task/finish', { _id });
};
