import * as React from 'react';
import { styled } from '../theme';
import { shuffle, sample } from 'lodash';
import { useBreakpoint } from '../../Breakpoint';

import { Grid, Item } from '../components/grid';
// import { CaliperIcon } from '../components/icons/static/CaliperIcon';
// import { MountainIcon } from '../components/icons/static/MountainIcon';
// import { BasketballIcon } from '../components/icons/static/BasketballIcon';
// import { LayersIcon } from '../components/icons/static/LayersIcon';
// import { MugIcon } from '../components/icons/static/MugIcon';
// import { CanadaIcon } from '../components/icons/static/CanadaIcon';
// import { ControllerIcon } from '../components/icons/static/ControllerIcon';
// import { HamburgerIcon } from '../components/icons/static/HamburgerIcon';
// import { DumbbellIcon } from '../components/icons/static/DumbbellIcon';
// import { BrushIcon } from '../components/icons/static/BrushIcon';
// import { PlaneIcon } from '../components/icons/static/PlaneIcon';
// import { BoxIcon } from '../components/icons/static/BoxIcon';
import { CameraIcon } from '../components/icons/static/CameraIcon';
import { CodeIcon } from '../components/icons/static/CodeIcon';
import { CloudIcon } from '../components/icons/static/CloudIcon';
import { FeatherIcon } from '../components/icons/static/FeatherIcon';
import { GearIcon } from '../components/icons/static/GearIcon';
import { FlaskIcon } from '../components/icons/static/FlaskIcon';
import { ImageIcon } from '../components/icons/static/ImageIcon';
import { LaptopIcon } from '../components/icons/static/LaptopIcon';
import { PrintIcon } from '../components/icons/static/PrintIcon';
import { SEOIcon } from '../components/icons/static/SEOIcon';
import { MusicIcon } from '../components/icons/static/MusicIcon';
import { VideoIcon } from '../components/icons/static/VideoIcon';

const START_TOP_RIGHT = [-1, 1]
const START_BOTTOM_RIGHT = [-1, -1]
const START_BOTTOM_LEFT = [1, -1]
const START_TOP_LEFT = [1, 1]
type START_POSITION =
 | typeof START_TOP_RIGHT
 | typeof START_BOTTOM_RIGHT
 | typeof START_BOTTOM_LEFT
 | typeof START_TOP_LEFT;

const icons = [
  // CaliperIcon,
  // MountainIcon,
  // BasketballIcon,
  // LayersIcon,
  // MugIcon,
  // CanadaIcon,
  // ControllerIcon,
  // HamburgerIcon,
  // DumbbellIcon,
  // BrushIcon,
  // PlaneIcon,
  // BoxIcon,
  CameraIcon,
  CodeIcon,
  CloudIcon,
  FeatherIcon,
  GearIcon,
  FlaskIcon,
  ImageIcon,
  LaptopIcon,
  PrintIcon,
  SEOIcon,
  MusicIcon,
  VideoIcon
];

const sizes = [ 1, 2, 2, 2, 3 ];
const grids = {
  xs: [4, 8, START_TOP_RIGHT],
  sm: [8, 6, START_BOTTOM_RIGHT],
  md: [10, 6, START_BOTTOM_RIGHT],
  lg: [15, 8, START_BOTTOM_RIGHT],
  xl: [20, 10, START_BOTTOM_RIGHT],
};

export const AboutIconGrid: React.FC = () => {
  const { current } = useBreakpoint();

  return (
    <IconGrid
      columns="repeat(auto-fill, minmax(80px, 1fr))"
      rows="repeat(auto-fill, minmax(80px, 1fr))"
      flow="row"
    >
    {shuffle(icons).map((icon, i) => {
      let size = sample(sizes);
      // let [x, y] = floodFill(layout, size, grids[current]);

      return (
        <Item
          key={`icon-${i}`}
          as={icon}
          alignSelf="stretch"
          justifySelf="stretch"
          gridRow={`span ${size}`}
          gridColumn={`span ${size}`}
        />
      );
    })}
    </IconGrid>
  );
};

const IconGrid = styled(Grid)`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;

  opacity: 0.2;

  height: 100vh;
  width: 100vw;
`;

// const floodFill = (
//   grid: [[boolean]],
//   size: [number, number],
//   initial: [number, number, START_POSITION]
// ): [[number, number], [number, number]] | null => {
//   return null;
// };

// Flood-fill (node, target-color, replacement-color):
//  1. If target-color is equal to replacement-color, return.
//  2. ElseIf the color of node is not equal to target-color, return.
//  3. Else Set the color of node to replacement-color.
//  4. Perform Flood-fill (one step to the south of node, target-color, replacement-color).
//     Perform Flood-fill (one step to the north of node, target-color, replacement-color).
//     Perform Flood-fill (one step to the west of node, target-color, replacement-color).
//     Perform Flood-fill (one step to the east of node, target-color, replacement-color).
//  5. Return.
