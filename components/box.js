import { css } from "goober";
import { animate, mix } from "popmotion";
import { layoutNode, updateProjectionStyle } from "projection";
import S from "s-js";

function pixelsToPercent(pixels, min, max) {
  return (pixels / (max - min)) * 100;
}

function mixRect(prev, next, p) {
  return {
    top: mix(prev.top, next.top, p),
    left: mix(prev.left, next.left, p),
    right: mix(prev.right, next.right, p),
    bottom: mix(prev.bottom, next.bottom, p),
  };
}

function animateRect(rect, options = {}) {
  const result = S.data(S.sample(rect));
  S((prev) => {
    if (prev && rect()) {
      animate({
        ...options,
        from: 0,
        to: 1,
        onUpdate: (p) => void result(mixRect(prev, rect(), p)),
      });
    } else {
      result(rect());
    }
    return rect();
  }, S.sample(rect));
  return result;
}

function getLayoutRect(element, trigger) {
  const rect = S.data();
  const childTrigger = S.data();
  S.on([element, trigger], () => {
    if (element()) {
      element().style.transform = "";
      childTrigger(null);
      rect(element().getBoundingClientRect());
    }
  });
  return [rect, childTrigger];
}

function projectElement(
  element,
  targetRect,
  layoutRect,
  parent,
  borderRadius = 16
) {
  return S(() => {
    if (element()) {
      const projection = layoutNode(
        {
          onProjectionUpdate: () =>
            updateProjectionStyle(element(), projection),
        },
        typeof parent === "function" ? parent() : undefined
      );
      S.cleanup(() => {
        projection.destroy();
      });
      S(() => {
        if (layoutRect()) {
          projection.setLayout(layoutRect());
        }
      });
      S.on([targetRect, layoutRect], () => {
        if (targetRect()) {
          projection.setTarget(targetRect());
          element().style.borderRadius = `${pixelsToPercent(
            borderRadius,
            targetRect().left,
            targetRect().right
          )}% / ${pixelsToPercent(
            borderRadius,
            targetRect().top,
            targetRect().bottom
          )}%`;
        }
      });
      return projection;
    }
  });
}

function animatedElement(context) {
  const element = S.data();
  const [layoutRect, layoutTrigger] = getLayoutRect(
    element,
    context.layoutTrigger
  );
  const targetRect = animateRect(layoutRect);
  const projection = projectElement(
    element,
    targetRect,
    layoutRect,
    context.projection
  );
  return { element, projection, layoutTrigger };
}

export default function ({ pos }) {
  const element = S.data();
  const [layoutRect] = getLayoutRect(element, element);
  const targetRect = animateRect(layoutRect);
  projectElement(element, targetRect, layoutRect);
  const [top, right] = pos;
  return {
    ref: element,
    class: css({
      position: "absolute",
      background: "#aab",
      top: top + "px",
      right: right + "px",
      width: "10rem",
      height: "10rem",
      borderRadius: "1rem",
    }),
  };
}
