import {
  GraphModel,
  PolylineEdge,
  PolylineEdgeModel,
  h
} from '@logicflow/core';

type DirectionType = 't' | 'b' | 'l' | 'r' | '';
type ArcQuadrantType = 'tl' | 'tr' | 'bl' | 'br' | '-';

const directionMap: {
  [key: string]: ArcQuadrantType;
} = {
  tr: 'tl',
  lb: 'tl',
  tl: 'tr',
  rb: 'tr',
  br: 'bl',
  lt: 'bl',
  bl: 'br',
  rt: 'br'
};

/**
 * 点过滤
 * 去除重复或不必要的控制点，确保路径平滑且不冗余。
 * @param points 路径点数组
 * @returns 去除重复或不必要的控制点后的点列表。
 */
function pointFilter(points: number[][]) {
  const all = points;
  let i = 1;
  while (i < all.length - 1) {
    const [x, y] = all[i - 1];
    const [x1, y1] = all[i];
    const [x2, y2] = all[i + 1];
    if ((x === x1 && x1 === x2) || (y === y1 && y1 === y2)) {
      all.splice(i, 1);
    } else {
      i++;
    }
  }
  return all;
}

/**
 * 中间点计算
 * 根据当前点的方向和半径，计算出弯曲路径的两个中间点。
 */
/**
 * 中间点计算
 * 根据当前点的方向和半径，计算出弯曲路径的两个中间点。
 * @param cur 当前点
 * @param key 方向键
 * @param orientation 象限方向
 * @param radius 半径
 * @returns 根据方向和半径计算出的两个中间点。
 */
function getMidPoints(
  cur: any,
  key: string,
  orientation: ArcQuadrantType,
  radius: number
) {
  const mid1 = [cur[0], cur[1]];
  const mid2 = [cur[0], cur[1]];
  switch (orientation) {
    case 'tl': {
      if (key === 'tr') {
        mid1[1] += radius;
        mid2[0] += radius;
      } else if (key === 'lb') {
        mid1[0] += radius;
        mid2[1] += radius;
      }
      return [mid1, mid2];
    }
    case 'tr': {
      if (key === 'tl') {
        mid1[1] += radius;
        mid2[0] -= radius;
      } else if (key === 'rb') {
        mid1[0] -= radius;
        mid2[1] += radius;
      }
      return [mid1, mid2];
    }
    case 'bl': {
      if (key === 'br') {
        mid1[1] -= radius;
        mid2[0] += radius;
      } else if (key === 'lt') {
        mid1[0] += radius;
        mid2[1] -= radius;
      }
      return [mid1, mid2];
    }
    case 'br': {
      if (key === 'bl') {
        mid1[1] -= radius;
        mid2[0] -= radius;
      } else if (key === 'rt') {
        mid1[0] -= radius;
        mid2[1] -= radius;
      }
      return [mid1, mid2];
    }
    default:
      return [];
  }
}

/**
 * 部分路径生成
 * 根据前后点的方向和位置，生成一段部分路径，并处理路径的弯曲部分。
 * @param prev 前一个点
 * @param cur 当前点
 * @param next 后一个点
 * @param radius 半径
 * @returns
 */
function getPartialPath(
  prev: any,
  cur: any,
  next: any,
  radius: number
): string {
  let dir1: DirectionType = '';
  let dir2: DirectionType = '';

  if (prev[0] === cur[0]) {
    dir1 = prev[1] > cur[1] ? 't' : 'b';
  } else if (prev[1] === cur[1]) {
    dir1 = prev[0] > cur[0] ? 'l' : 'r';
  }

  if (cur[0] === next[0]) {
    dir2 = cur[1] > next[1] ? 't' : 'b';
  } else if (cur[1] === next[1]) {
    dir2 = cur[0] > next[0] ? 'l' : 'r';
  }

  const r =
    Math.min(
      Math.hypot(cur[0] - prev[0], cur[1] - prev[1]) / 2,
      Math.hypot(next[0] - cur[0], next[1] - cur[1]) / 2,
      radius
    ) || (1 / 5) * radius;

  const key = `${dir1}${dir2}`;
  const orientation: ArcQuadrantType = directionMap[key] || '-';
  let path = `L ${prev[0]} ${prev[1]}`;

  if (orientation === '-') {
    path += `L ${cur[0]} ${cur[1]} L ${next[0]} ${next[1]}`;
  } else {
    const [mid1, mid2] = getMidPoints(cur, key, orientation, r);
    if (mid1 && mid2) {
      path += `L ${mid1[0]} ${mid1[1]} Q ${cur[0]} ${cur[1]} ${mid2[0]} ${mid2[1]}`;
      [cur[0], cur[1]] = mid2;
    }
  }
  return path;
}

/**
 * 完整路径生成
 * 将所有部分路径拼接成完整的弯曲路径。
 * @param points 点列表
 * @param radius 半径
 * @returns
 */
function getCurvedEdgePath(points: number[][], radius: number): string {
  let i = 0;
  let d = '';
  if (points.length === 2) {
    d += `M${points[i][0]} ${points[i++][1]} L ${points[i][0]} ${points[i][1]}`;
  } else {
    d += `M${points[i][0]} ${points[i++][1]}`;
    for (; i + 1 < points.length; ) {
      const prev = points[i - 1] as any;
      const cur = points[i] as any;
      const next = points[i++ + 1] as any;
      d += getPartialPath(prev, cur, next, radius as number);
    }
    d += `L ${points[i][0]} ${points[i][1]}`;
  }
  return d;
}

/**
 * 视图类
 * 定义了视图类 View，继承自 PolylineEdge，用于渲染弯曲路径。
 */
class View extends PolylineEdge {
  getEdge() {
    const { model } = this.props;
    const { points: pointsStr, isAnimation, arrowConfig, radius = 5 } = model;
    const style = model.getEdgeStyle();
    // 获取动画样式
    const animationStyle = model.getEdgeAnimationStyle();
    // 处理点数据
    const points = pointFilter(
      pointsStr.split(' ').map((p) => p.split(',').map((a) => +a))
    );
    // 生成路径
    const d = getCurvedEdgePath(points, radius as number);
    const attrs = {
      style: isAnimation ? animationStyle : {},
      ...style,
      ...arrowConfig,
      fill: 'none'
    };
    return h('path', {
      d,
      ...attrs
    });
  }
}

/**
 * 模型类
 * 定义了模型类 Model，继承自 PolylineEdgeModel，用于配置边缘属性并重写动画样式。
 */
class Model extends PolylineEdgeModel {
  constructor(data: any, graphModel: GraphModel) {
    super(data, graphModel);
    this.properties = {
      ...this.properties,
      // 属性面板添加条件
      isDefaultFlow: false
    };
  }
  getEdgeAnimationStyle() {
    const style = super.getEdgeAnimationStyle();
    style.strokeDasharray = '5 5';
    style.animationDuration = '30s';
    style.stroke = '#008000';

    return style;
  }
}

const CurvedEdge = {
  type: 'bpmn:sequenceFlow',
  view: View,
  model: Model
};

export default CurvedEdge;
