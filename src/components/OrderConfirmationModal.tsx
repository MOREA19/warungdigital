import React from 'react';
import { Check, X } from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  orderNumber?: string;
  total?: number;
  paymentMethod?: string;
  onClose: () => void;
  onConfirm?: () => void;
  type?: 'confirmation' | 'success';
}

export function OrderConfirmationModal({
  isOpen,
  orderNumber,
  total,
  paymentMethod,
  onClose,
  onConfirm,
  type = 'success',
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-[50%] left-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {type === 'success' ? (
            <>
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                Pesanan Berhasil!
              </h2>

              {/* Subtitle */}
              <p className="text-center text-gray-600 mb-6">
                Terima kasih telah berbelanja di Warung Digital Arkan
              </p>

              {/* Order Details */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-3">
                {orderNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nomor Pesanan</span>
                    <span className="font-semibold text-gray-900">{orderNumber}</span>
                  </div>
                )}

                {total !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Pembayaran</span>
                    <span className="font-semibold text-blue-900">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}

                {paymentMethod && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span className="font-semibold text-gray-900">
                      {paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : 'Transfer Bank'}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Text */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  📦 Pesanan Anda sedang diproses. Tim kami akan menghubungi Anda untuk konfirmasi pengiriman.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-medium"
              >
                Kembali ke Toko
              </button>
            </>
          ) : (
            <>
              {/* Confirmation Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-blue-900" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                Konfirmasi Pesanan
              </h2>

              {/* Subtitle */}
              <p className="text-center text-gray-600 mb-6">
                Apakah Anda yakin ingin melanjutkan pesanan ini?
              </p>

              {/* Order Details */}
              {total !== undefined && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Pembayaran</span>
                    <span className="font-semibold text-blue-900">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 text-gray-900 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  className="flex-1 bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-medium"
                >
                  Konfirmasi
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
