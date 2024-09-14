import React, { useState } from 'react';
import { Modal } from '@frontend/components/common/Modal';
import { Button, ButtonType } from '@frontend/components/common/Button';
import { Slider } from '@frontend/components/common/Slider';
import { useAuth } from '@frontend/context/AuthContext';
import { amount } from '@frontend/utils/number';
import { usePurchaseEventsQuery } from '@frontend/queries/stripe/usePurchaseEventsQuery';

interface PurchaseEventsModalProps {
  visible: boolean;
  closeModal: () => void;
}

export const PurchaseEventsModal: React.FC<PurchaseEventsModalProps> = ({
  visible,
  closeModal,
}) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const { execute, loading, error } = usePurchaseEventsQuery();

  const calculatePrice = (qty: number) => {
    if (qty === 0) return 5;
    return qty * 10;
  };

  const calculateEvents = (qty: number) => {
    if (qty === 0) return 100000;
    return qty * 1000000;
  };

  const handlePurchase = async () => {
    const price = calculatePrice(quantity);
    try {
      const response = await execute({ amount: price });
      if (response && response.url) {
        window.open(response.url, '_blank');
      }
      closeModal();
    } catch (err) {
      console.error('Error purchasing events:', err);
    }
  };

  return (
    <Modal visible={visible} closeModal={closeModal} closeOnBackgroundTouch={false}>
      <h2 className="text-2xl font-bold mb-4 text-secondary-accent">Purchase More Events</h2>
      <p className="mb-4">
        You currently have {amount(user.events_left)} events left. Purchase more events to continue
        tracking.
      </p>
      <div className="mb-6">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-tertiary-background p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-secondary-accent">${calculatePrice(quantity)}</p>
            <p className="text-lg">{amount(calculateEvents(quantity))} events</p>
          </div>
        </div>
        <Slider
          id="quantity"
          min={0}
          max={10}
          step={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
          className="w-full"
        />
      </div>
      <p className="mb-4 text-sm text-text-secondary">
        Events expire after 1 year from the purchase date.
      </p>
      {error && <p className="text-error mb-4">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button type={ButtonType.Secondary} onClick={closeModal}>
          Cancel
        </Button>
        <Button type={ButtonType.Primary} onClick={handlePurchase} loading={loading}>
          Purchase
        </Button>
      </div>
    </Modal>
  );
};
