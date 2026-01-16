import type { Point } from '@/common/types/point';
import type { Camera } from '@/common/types/camera';

/**
 *
 * @param viewportPoint 뷰포트 기준 좌표
 * @param containerPoint 캔버스 컨테이너 기준 좌표
 * @param camera 카메라 좌표 (월드 좌표계의 원점(0, 0)이 화면(컨테이너)의 어디에 그려지는가)
 * @returns 월드 좌표계 좌표
 */
export function getPositionInCanvas(
  { x: viewportX, y: viewportY }: Point,
  { x: containerX, y: containerY }: Point,
  camera: Camera,
): Point {
  // 1단계: 뷰포트 기준 좌표 -> 캔버스 컨테이너 기준 좌표 변환
  // 뷰포트에서의 변환하고 싶은 좌표 - 뷰포트에서의 캔버스 컨테이너의 좌표 = 캔버스 컨테이너에서의 마우스 좌표
  const xInCanvas = viewportX - containerX;
  const yInCanvas = viewportY - containerY;

  // 3단계: 월드 좌표계 좌표
  // 캔버스 컨테이너에서의 좌표 - 카메라 좌표 = 월드 좌표계에서의 좌표
  const xInWorld = (xInCanvas - camera.x) / camera.scale;
  const yInWorld = (yInCanvas - camera.y) / camera.scale;

  return { x: xInWorld, y: yInWorld };
}
