import React, { useState, useCallback, useRef } from "react";
import { FlatList, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VideoItem } from "@/components/VideoItem";
import { IVideo } from "@/interfaces/video";
import { generateData } from "@/utils/generateData";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HomeScreen = () => {
  const [videoData] = useState<IVideo[]>(generateData(20));
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== undefined) {
          setCurrentIndex(newIndex);
        }
      }
    }
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const renderItem = useCallback(
    ({ item, index }: { item: IVideo; index: number }) => (
      <VideoItem item={item} index={index} currentIndex={currentIndex} />
    ),
    [currentIndex]
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
