const axios = require('axios')
// Service momo payment
const createMomoPayment = async (orderInfo) => {
    const { OrderID, Money} = orderInfo


    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    //Connection link
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000';
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var requestType = "payWithMethod";
    var amount = Money;
    //var orderId = partnerCode + new Date().getTime();
    var orderId = OrderID;
    var requestId = orderId;
    var extraData ='';
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
    });

    option = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      data: requestBody
    }


    const response = await axios(option);
    return response.data;
};

module.exports = { createMomoPayment };

// class PaymentService {
//     async createPayment(orderData) {
//       // Giả lập xử lý thanh toán
//       const { orderId, amount, paymentMethod } = orderData;
      
//       if (!orderId || !amount || !paymentMethod) {
//         throw new Error('Thiếu thông tin đơn hàng!');
//       }
  
//       // Giả lập kết quả thanh toán
//       return {
//         status: 'success',
//         message: 'Thanh toán thành công!',
//         orderId,
//         amount,
//         paymentMethod,
//         paymentId: `PAY-${Date.now()}`,
//         timestamp: new Date().toISOString(),
//       };
//     }
//   }
  
//   module.exports = new PaymentService();