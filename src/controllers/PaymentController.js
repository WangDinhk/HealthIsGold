const PaymentService = require('../services/PaymentService');

const createPayment = async (req, res) => {
    //console.log(req.body)
    try {
        const orderInfo = req.body;
        const momoResponse = await PaymentService.createMomoPayment(orderInfo);
        console.log(momoResponse)
    
        if (momoResponse?.payUrl) {
          res.status(200).json({
            success: true,
            message: 'Tạo thanh toán thành công',
            payUrl: momoResponse.payUrl,
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Không thể tạo yêu cầu thanh toán',
          });
        }
      } catch (error) {
        console.error('Lỗi tạo thanh toán:', error);
        res.status(500).json({
          success: false,
          message: 'Đã xảy ra lỗi khi tạo thanh toán',
          error: error.message,
        });
      }
};
    
module.exports = { createPayment };

// src/controllers/PaymentController.js

// const PaymentService = require('../services/PaymentService');

// class PaymentController {
//   async createPayment(req, res) {
//     try {
//       const orderData = req.body;
//       const paymentResult = await PaymentService.createPayment(orderData);
//       res.status(200).json(paymentResult);
//     } catch (error) {
//       res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }
// }

// module.exports = new PaymentController();
