import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  UIManager,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
type DirectionType = "right" | "left";

type DeckProps = {
  onSwipeLeft: (item: any) => void;
  onSwipeRight: (item: any) => void;
  data: any;
  renderCard: (item: any) => any;
  renderNoMoreCards: () => void;
};

const Deck = (props: DeckProps) => {
  const [index, setIndex] = useState(0);
  const positionRef = useRef(new Animated.ValueXY());
  const { onSwipeLeft, onSwipeRight, data, renderCard, renderNoMoreCards } =
    props;

  useLayoutEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  const onSwipeComplete = useCallback(
    (direction: DirectionType) => {
      const item = data[index];
      if (direction === "right") {
        onSwipeRight(item);
      } else {
        onSwipeLeft(item);
      }
      positionRef.current.setValue({ x: 0, y: 0 });
      setIndex(index + 1);
    },
    [data, index, onSwipeLeft, onSwipeRight]
  );

  const forceSwipe = useCallback(
    (direction: DirectionType) => {
      const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
      Animated.timing(positionRef.current, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }).start(() => onSwipeComplete(direction));
    },
    [onSwipeComplete]
  );

  const resetPosition = useCallback(() => {
    Animated.spring(positionRef.current, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          positionRef.current.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (event, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe("right");
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe("left");
          } else {
            resetPosition();
          }
        },
      }),
    [forceSwipe, resetPosition]
  );

  const getCardStyle = () => {
    const rotate = positionRef.current.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...positionRef.current.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item: any, i: number) => {
        if (i < index) return null;

        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (i - index), zIndex: 5 }]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};

const styles = {
  cardStyle: {
    position: "absolute" as const,
    width: SCREEN_WIDTH,
  },
};

export default Deck;
