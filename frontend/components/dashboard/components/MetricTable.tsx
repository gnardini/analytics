import { Loader } from '@frontend/components/common/Loader';
import { useNotification } from '@frontend/context/NotificationContext';
import { MetricData } from '@type/dashboard';
import React, { ReactNode, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import FullMetricTableModal from '../modals/FullMetricTableModal';
import { amount } from '@frontend/utils/number';

interface MetricTableProps {
  title: string;
  data: MetricData[];
  nameTransform?: (name: string) => ReactNode;
  nameColumnText: string;
  valueColumnText: string;
  isLoading: boolean;
}

const MetricTable: React.FC<MetricTableProps> = ({
  title,
  data,
  nameTransform,
  nameColumnText,
  valueColumnText,
  isLoading,
}) => {
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard', 'success');
    });
  };

  const ROWS_TO_DISPLAY = 10;

  const generatePlaceholderRows = (count: number) => {
    return Array(count)
      .fill(null)
      .map((_, index) => (
        <div key={`placeholder-${index}`} className="h-[46px]" />
        // <div key={`placeholder-${index}`} className="invisible flex py-2 border-t border-tertiary-background">
        //   <div className="flex-grow h-6 bg-tertiary-background rounded animate-pulse"></div>
        // </div>
      ));
  };

  const displayedData = data.slice(0, ROWS_TO_DISPLAY);
  const placeholderRowsCount = Math.max(0, ROWS_TO_DISPLAY - displayedData.length);
  const hasMoreData = data.length > ROWS_TO_DISPLAY;

  return (
    <div className="bg-secondary-background p-4 rounded-lg">
      <h3 className="text-secondary-accent font-semibold mb-2">{title}</h3>
      <div className="w-full">
        <div className="flex font-semibold mb-2">
          <div className="flex-grow text-text-secondary">{nameColumnText}</div>
          <div className="w-16 text-right text-text-secondary">{valueColumnText}</div>
        </div>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-secondary-background bg-opacity-50 z-10">
              <Loader size={30} color="rgb(var(--secondary-accent))" />
            </div>
          )}
          {displayedData.map((item, index) => (
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
              <div className="w-14 text-right shrink-0">{amount(item.count)}</div>
            </div>
          ))}
          {generatePlaceholderRows(placeholderRowsCount)}
        </div>
      </div>
      {hasMoreData && !isLoading && (
        <div className="text-center mt-4">
          <button
            className="text-secondary-accent hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            SEE MORE
          </button>
        </div>
      )}
      <FullMetricTableModal
        visible={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={title}
        data={data}
        nameTransform={nameTransform}
        nameColumnText={nameColumnText}
        valueColumnText={valueColumnText}
      />
    </div>
  );
};

export default MetricTable;
