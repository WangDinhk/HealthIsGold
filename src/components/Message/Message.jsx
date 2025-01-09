import {message} from 'antd'

const success = (mes='Success') => {
    message.success(mes);
  };

  const error = (mes = "Sai mật khẩu hoặc Email", duration = 3) => {
    message.error({
        content: mes,
        duration,
    });
};
const warning = (mes='Warning') => {
message.warning(mes);
};

export {success,error,warning};