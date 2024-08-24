import React, { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { RadialSlice, MenuItem } from './RadialSlice';
import { calculateRadius } from './utils';
import css from './RadialMenu.module.css';
import classNames from 'classnames';

interface RadialMenuProps {
  /**
   * An array of menu items to be displayed in the radial menu.
   */
  items: MenuItem[];

  onNodeClick?: () => void;

  /**
   * The function to call when the node is double clicked.
   */
  onNodeDoubleClick?: () => void;

  centerWidth?: number;

  centerHeight?: number;

  centerFill?: string;

  /**
   * The radius of the radial menu.
   */
  radius?: number;

  /**
   * The inner radius of the radial menu.
   */
  innerRadius?: number;

  /**
   * The starting offset angle for the first menu item.
   */
  startOffsetAngle?: number;

  /**
   * The CSS class name for the radial menu.
   */
  className?: string;

  /**
   * A function that is called when the radial menu is closed.
   * The function receives the mouse event that triggered the closure.
   */
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const RadialMenu: FC<RadialMenuProps> = ({
  items,
  radius,
  className,
  innerRadius,
  startOffsetAngle,
  onClose,
  onNodeClick,
  onNodeDoubleClick
}) => {
  const { centralAngle, polar, startAngle, deltaAngle } = useMemo(
    () => calculateRadius(items, startOffsetAngle),
    [items, startOffsetAngle]
  );
  const timeout = useRef<any | null>(null);

  useLayoutEffect(() => {
    const timer = timeout.current;
    return () => clearTimeout(timer);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      role="menu"
      className={classNames(css.container, className)}
      onClick={onNodeClick}
      onDoubleClick={onNodeDoubleClick}
      onPointerEnter={() => {
        clearTimeout(timeout.current);
      }}
      onPointerLeave={event => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => onClose?.(event), 500);
      }}
    >
      {items.map((slice, index) => (
        <RadialSlice
          key={index}
          {...slice}
          radius={radius}
          innerRadius={innerRadius}
          startAngle={startAngle}
          endAngle={centralAngle * index}
          skew={polar ? 0 : deltaAngle}
          polar={polar}
          centralAngle={centralAngle}
          onClick={event => {
            slice?.onClick(event);
            onClose?.(event);
          }}
        />
      ))}
    </div>
  );
};

RadialMenu.defaultProps = {
  radius: 175,
  innerRadius: 25,
  startOffsetAngle: 0
};
