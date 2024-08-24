import React from 'react';
import { GraphCanvas, Icon, RadialMenu } from '../../src';
import {
  iconNodes,
  parentEdges,
  parentNodes,
  simpleEdges,
  simpleNodes
} from '../assets/demo';
import demonSvg from '../assets/demon.svg';
import computerSvg from './computer.svg';

export default {
  title: 'Demos/Context Menu/Radial',
  component: GraphCanvas
};

export const Simple = () => (
  <GraphCanvas
    nodes={simpleNodes.map(item => ({
      ...item
    }))}
    edges={simpleEdges}
    contextMenu={({ data, onClose }) => (
      <RadialMenu
        node={data}
        onClose={onClose}
        items={[
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Add a node');
              onClose();
            }
          },
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          },
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          },
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          },
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          },
          {
            icon: <img src={demonSvg} />,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          }
        ]}
      />
    )}
  />
);

export const Disabled = () => (
  <GraphCanvas
    nodes={simpleNodes}
    edges={simpleEdges}
    contextMenu={({ data, onClose }) => (
      <RadialMenu
        onClose={onClose}
        items={[
          {
            icon: demonSvg,
            disabled: true,
            onClick: () => {
              alert('Add a node');
              onClose();
            }
          },
          {
            icon: demonSvg,
            disabled: true,
            onClick: () => {
              alert('Remove the node');
              onClose();
            }
          }
        ]}
      />
    )}
  />
);
