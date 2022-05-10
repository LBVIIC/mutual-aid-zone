import { Toast } from 'vant';
import { ref } from 'vue';
import { recharge, getBalance } from '../api/store';

const balance = ref(0);
export const useBalance = () => {
  // 获取余额
  const handleBalance = async () => {
    const { data: res } = await getBalance();
    balance.value = res.data.balance;
  };
  handleBalance();

  // 充值
  const rechargeNum = ref<number>();
  const handleRecharge = async () => {
    if ([undefined, null, 0, ''].includes(rechargeNum.value)) {
      Toast('请输入充值金额');
      return;
    }
    const { data: res } = await recharge(rechargeNum.value);
    if (res.errno === 0) {
      Toast('充值成功');
      balance.value = res.data.balance;
      rechargeNum.value = null;
    }
  };

  return { balance, rechargeNum, handleRecharge };
};
