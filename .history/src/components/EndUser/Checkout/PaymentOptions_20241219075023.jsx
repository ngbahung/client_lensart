import React from 'react';

const PaymentOptions = ({ selected, onChange }) => {
  const paymentMethods = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng'
    },
    {
      id: 'payos',
      name: 'Thanh toán bằng chuyển khoản ngân hàng qua payOS',
      description: 'Thanh toán online qua cổng thanh toán payOS'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Phương thức thanh toán</h3>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selected === method.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}
            onClick={() => onChange(method.id)}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === method.id ? 'border-orange-500' : 'border-gray-300'
                }`}
              >
                {selected === method.id && (
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-800">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
