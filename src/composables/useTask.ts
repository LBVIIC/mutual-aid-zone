import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatTime } from '../utils/formatTime';
import { acceptTask, createTask, deleteTask, editTask, finishTask, getTaskDetail, giveupTask } from '../api/task';
import { Toast } from 'vant';
import { Task, BaseTask } from '../types';

export const useTask = () => {
  const route = useRoute();
  const router = useRouter();

  // 表单校验规则
  const rules = [{ required: true, message: '请填写完整' }];
  const titleRules = [
    ...rules,
    {
      validator: (val: string) => {
        if (val.length > 15) {
          return '标题不能超过15字';
        } else if (val.length < 3) {
          return '标题不能少于3字';
        }
      }
    }
  ];
  const priceRules = [
    ...rules,
    {
      validator: (val: number) => {
        if (val < 0) {
          return '价格不能为小于零';
        } else if (val >= 1000) {
          return '价格不能超过1000';
        }
      }
    }
  ];

  const TaskModel = ref<Task>({
    _id: '',
    title: '',
    content: '',
    price: null,
    setter: { _id: '' },
    getter: { _id: '' },
    imgFiles: [],
    imgs: [],
    status: null,
    createdAt: ''
  });

  const handleSubmit = async (type: string) => {
    const formData = new FormData();
    formData.append('title', TaskModel.value.title);
    formData.append('price', TaskModel.value.price.toString());
    formData.append('content', TaskModel.value.content);
    TaskModel.value.imgFiles &&
      TaskModel.value.imgFiles.forEach((item) => {
        formData.append('imgFiles', item.file);
      });

    if (type === 'create') {
      const { data: res } = await createTask(formData);
      if (res.errno === 0) {
        router.push({ name: 'Detail', params: { id: res.data._id } });
        Toast('发布成功');
      } else {
        Toast(res.msg);
      }
    } else if (type === 'edit') {
      formData.append('_id', route.params.id.toString());
      const { data: res } = await editTask(formData);
      if (res.errno === 0) {
        router.push({ name: 'Detail', params: { id: res.data._id } });
        Toast('编辑成功');
      } else {
        Toast(res.msg);
      }
    }
  };

  
  // 根据id获取任务详情
  const handleDetail = async () => {
    const { data: res } = await getTaskDetail(route.params.id as string);
    if (res.errno === 0) {
      // 格式化时间
      res.data.createdAt = formatTime(res.data.createdAt);
      TaskModel.value = res.data;
      return TaskModel;
    } else {
      Toast(res.msg);
      router.push('/');
    }
  };

  // 根据用户设置按钮状态
  const btnStatus = reactive({
    publish: false,
    unaccept: false,
    accept: false
  });

  route.params.id &&
    handleDetail().then((taskModel) => {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      if (taskModel.value.status === 2) {
        return;
      }
      if (taskModel.value.setter._id === userId) {
        // 任务发布者
        btnStatus.publish = true;
      } else if (taskModel.value.getter._id === userId) {
        // 任务接收者
        btnStatus.accept = true;
      } else if (taskModel.value.status !== 1) {
        // 任务未接单时，路人浏览
        btnStatus.unaccept = true;
      }
    });

  const handleDelete = () => {
    deleteTask(TaskModel.value._id);
    Toast('删除成功');
    router.push({ name: 'Home' });
  };
  const handlePushEdit = () => {
    router.push({ name: 'Edit', params: { id: route.params.id } });
  };
  const handleGiveup = () => {
    giveupTask(TaskModel.value._id);
    Toast('放弃成功');
    router.go(0);
  };
  const handleFinish = () => {
    finishTask(TaskModel.value._id);
    Toast('任务完成');
    router.go(0);
  };
  const handleAccept = () => {
    acceptTask(TaskModel.value._id);
    Toast('接受成功');
    router.go(0);
  };
  return {
    rules,
    titleRules,
    priceRules,
    sendTaskModel: TaskModel,
    returnTaskModel: TaskModel,
    btnStatus,
    handleSubmit,
    handleDelete,
    handlePushEdit,
    handleGiveup,
    handleFinish,
    handleAccept
  };
};
