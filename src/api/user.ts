import instance from '../utils/request';

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
export const login = (username: string, password: string) => {
  return instance.post('/api/user/login', {
    username,
    password
  });
};

/**
 * 注册
 * @param username 用户名
 * @param phone 手机号
 * @param email 邮箱
 * @param password 密码
 * @returns
 */
export const register = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/api/user/register', {
    username,
    phone,
    email,
    password
  });
};

/** 获取用户详情 */
export const getUserDetail = () => {
  return instance.get('/api/user/detail');
};

/**
 * 修改密码
 * @param password 新密码
 * @returns
 */
export const changePassword = (password: string) => {
  return instance.post('/api/user/password', {
    password
  });
};

/**
 * 修改用户信息
 * @param formData 用户信息
 * @returns 
 */
export const editUser = (formData: FormData) => {
  return instance.post('/api/user/edit', formData);
};
