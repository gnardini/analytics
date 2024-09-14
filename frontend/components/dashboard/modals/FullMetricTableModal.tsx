import React, { ReactNode } from 'react';
import { Modal } from '@frontend/components/common/Modal';
import { MetricData } from '@type/dashboard';
import { FaCopy } from 'react-icons/fa';
import { useNotification } from '@frontend/context/NotificationContext';

interface FullMetricTableModalProps {
  visible: boolean;
  closeModal: () => void;
  title: string;
  data: MetricData[];
  nameTransform?: (name: string) => ReactNode;
  nameColumnText: string;
  valueColumnText: string;
}

const FullMetricTableModal: React.FC<FullMetricTableModalProps> = ({
  visible,
  closeModal,
  title,
  data,
  nameTransform,
  nameColumnText,
  valueColumnText,
}) => {
  const { showNotification } = useNotification();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard', 'success');
    });
  };

  return (
    <Modal visible={visible} closeModal={closeModal} className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="w-full">
          <div className="flex font-semibold mb-2">
            <div className="flex-grow">{nameColumnText}</div>
            <div className="w-16 text-right">{valueColumnText}</div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="flex py-2 border-t border-tertiary-background group">
              <div
                className="flex-grow truncate pr-2 flex items-center cursor-pointer"
                onClick={() => copyToClipboard(item.name)}
              >
                <span className="truncate">
                  {nameTransform ? nameTransform(item.name) : item.name}
                </span>
                <button
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy to clipboard"
                >
                  <FaCopy className="text-secondary-accent" />
                </button>
              </div>
              <div className="w-14 text-right shrink-0">{item.count}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FullMetricTableModal;