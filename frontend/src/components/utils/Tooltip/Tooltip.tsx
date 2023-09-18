import {
  FloatingPortal,
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ReactNode, cloneElement, useState } from 'react';
import * as S from './Tooltip.styled';
import { AnimatePresence, motion } from 'framer-motion';

export type TooltipProps = {
  content: ReactNode;
  showDelay?: number;
  hideDelay?: number;
  placement?: Placement;
  children: JSX.Element;
};

const Tooltip = ({
  content,
  showDelay = 500,
  hideDelay = 100,
  placement = 'top',
  children,
}: TooltipProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: computedPlacement,
  } = useFloating({
    placement,
    open,
    onOpenChange(open) {
      setOpen(open);
    },
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: showDelay, restMs: hideDelay }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const translate = {
    top: { translateY: 5 },
    bottom: { translateY: -5 },
    left: { translateX: 5 },
    right: { translateX: -5 },
  }[
    computedPlacement.includes('-')
      ? computedPlacement.split('-')[0]
      : computedPlacement
  ];

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <S.Tooltip
              initial={{ opacity: 0, ...translate }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              {...getFloatingProps({
                ref: floating,
                className: 'Tooltip',
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                },
              })}
            >
              {content}
            </S.Tooltip>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
