import React, { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { RadialSlice, MenuItem } from './RadialSlice';
import { calculateRadius } from './utils';
import css from './RadialMenu.module.css';
import classNames from 'classnames';
import { GraphNode } from 'types';

interface RadialMenuProps {
  /**
   * An array of menu items to be displayed in the radial menu.
   */
  items: MenuItem[];

  containerStyle?: React.CSSProperties;

  centerStyle?: React.CSSProperties;

  centerIcon?: React.ReactElement;

  contentContainerStyle?: React.CSSProperties;

  node: GraphNode;

  onNodeClick?: () => void;

  /**
   * The function to call when the node is double clicked.
   */
  onNodeDoubleClick?: () => void;

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
  onNodeDoubleClick,
  node,
  centerStyle,
  containerStyle,
  centerIcon,
  contentContainerStyle
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

  console.log(node);

  return (
    <div
      role="menu"
      className={classNames(css.container, className)}
      style={containerStyle}
      onPointerEnter={() => {
        clearTimeout(timeout.current);
      }}
      onPointerLeave={event => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => onClose?.(event), 300);
      }}
    >
      <div
        onClick={onNodeClick}
        onDoubleClick={onNodeDoubleClick}
        onPointerOver={() => {}}
        onPointerOut={() => {}}
        className={css.centerCircle}
        style={{
          width: node.size * 7,
          height: node.size * 7,
          background: node.fill,
          ...(centerStyle || {})
        }}
      >
        {centerIcon ? centerIcon : null}
      </div>
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
          contentContainerStyle={contentContainerStyle}
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
