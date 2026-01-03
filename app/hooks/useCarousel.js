
import { useState, useCallback, useRef } from "react";

export const useCarouselDrag = ({
  onNext,
  onPrev,
  threshold = 50,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    currentX.current = clientX;
  }, []);

  const handleDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return;
      currentX.current = clientX;
      const diff = currentX.current - startX.current;
      setDragOffset(diff);
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const diff = currentX.current - startX.current;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onPrev();
      } else {
        onNext();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, threshold, onNext, onPrev]);

  // Mouse events
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    },
    [handleDragStart]
  );

  const onMouseMove = useCallback(
    (e) => {
      handleDragMove(e.clientX);
    },
    [handleDragMove]
  );

  const onMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const onMouseLeave = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  // Touch events (for mobile)
  const onTouchStart = useCallback(
    (e) => {
      handleDragStart(e.touches[0].clientX);
    },
    [handleDragStart]
  );

  const onTouchMove = useCallback(
    (e) => {
      handleDragMove(e.touches[0].clientX);
    },
    [handleDragMove]
  );

  const onTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  return {
    isDragging,
    dragOffset,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
};