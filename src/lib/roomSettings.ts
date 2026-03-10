export type RoomKey =
  | "oceanBreezeA"
  | "oceanBreezeB"
  | "oceanBreezeC"
  | "oceanBreezeD"
  | "surferRoomA"
  | "surferRoomB"
  | "surferRoomC"
  | "family";

export type RoomSetting = {
  price: string;
  image: string;
  gallery: string[];
  nameOverride?: string;
  descriptionOverride?: string;
  featuresOverride?: string[];
};

export type RoomSettingsMap = Record<RoomKey, RoomSetting>;

export const ROOM_ORDER: RoomKey[] = [
  "oceanBreezeA",
  "oceanBreezeB",
  "oceanBreezeC",
  "oceanBreezeD",
  "family",
  "surferRoomA",
  "surferRoomB",
  "surferRoomC",
];

export const defaultRoomSettings: RoomSettingsMap = {
  oceanBreezeA: {
    price: "IDR 400K",
    image: "/images/rooms/ocean-breeze-a/07.png",
    gallery: [
      "/images/rooms/ocean-breeze-a/02.png",
      "/images/rooms/ocean-breeze-a/05.png",
      "/images/rooms/ocean-breeze-a/01.png",
      "/images/rooms/ocean-breeze-a/06.png",
      "/images/rooms/ocean-breeze-a/04.png",
      "/images/rooms/ocean-breeze-a/03.png",
    ],
  },
  oceanBreezeB: {
    price: "IDR 400K",
    image: "/images/rooms/ocean-breeze-b/01.png",
    gallery: [
      "/images/rooms/ocean-breeze-b/01.png",
      "/images/rooms/ocean-breeze-b/02.png",
      "/images/rooms/ocean-breeze-b/03.png",
      "/images/rooms/ocean-breeze-b/04.png",
    ],
  },
  oceanBreezeC: {
    price: "IDR 400K",
    image: "/images/rooms/ocean-breeze-c/05.png",
    gallery: [
      "/images/rooms/ocean-breeze-c/04.png",
      "/images/rooms/ocean-breeze-c/01.png",
      "/images/rooms/ocean-breeze-c/02.png",
      "/images/rooms/ocean-breeze-c/03.png",
      "/images/rooms/ocean-breeze-c/05.png",
      "/images/rooms/ocean-breeze-c/06.png",
      "/images/rooms/ocean-breeze-c/07.png",
    ],
  },
  oceanBreezeD: {
    price: "IDR 350K",
    image:
      "https://i.pinimg.com/736x/d7/f1/75/d7f1755da70aff32ac140e17ca7bfc97.jpg",
    gallery: [
      "https://i.pinimg.com/736x/d7/f1/75/d7f1755da70aff32ac140e17ca7bfc97.jpg",
    ],
  },
  family: {
    price: "IDR 400K",
    image: "/images/rooms/family/06.png",
    gallery: [
      "/images/rooms/family/01.png",
      "/images/rooms/family/03.png",
      "/images/rooms/family/04.png",
      "/images/rooms/family/02.png",
      "/images/rooms/family/05.png",
    ],
  },
  surferRoomA: {
    price: "IDR 300K",
    image: "/images/rooms/surfer-a/06.png",
    gallery: [
      "/images/rooms/surfer-a/02.png",
      "/images/rooms/surfer-a/03.png",
      "/images/rooms/surfer-a/05.png",
    ],
  },
  surferRoomB: {
    price: "IDR 300K",
    image: "/images/rooms/surfer-c/01.png",
    gallery: [
      "/images/rooms/surfer-c/01.png",
      "/images/rooms/surfer-c/02.png",
      "/images/rooms/surfer-c/03.png",
      "/images/rooms/surfer-c/04.png",
      "/images/rooms/surfer-c/05.png",
      "/images/rooms/surfer-c/06.png",
      "/images/rooms/surfer-c/07.png",
      "/images/rooms/surfer-c/08.png",
    ],
  },
  surferRoomC: {
    price: "IDR 300K",
    image: "/images/rooms/surfer-c/01.png",
    gallery: [
      "/images/rooms/surfer-c/01.png",
      "/images/rooms/surfer-c/02.png",
      "/images/rooms/surfer-c/03.png",
      "/images/rooms/surfer-c/04.png",
      "/images/rooms/surfer-c/05.png",
      "/images/rooms/surfer-c/06.png",
      "/images/rooms/surfer-c/07.png",
      "/images/rooms/surfer-c/08.png",
    ],
  },
};

const STORAGE_KEY = "hello_sunshine_room_settings_v1";

const mergeRoomSettings = (overrides: Partial<RoomSettingsMap>) => {
  const merged: RoomSettingsMap = { ...defaultRoomSettings };
  (Object.keys(overrides) as RoomKey[]).forEach((key) => {
    if (!overrides[key]) return;
    merged[key] = {
      ...merged[key],
      ...overrides[key],
    };
  });
  return merged;
};

export const getRoomSettings = (): RoomSettingsMap => {
  if (typeof window === "undefined") return defaultRoomSettings;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultRoomSettings;
  try {
    const parsed = JSON.parse(raw) as Partial<RoomSettingsMap>;
    return mergeRoomSettings(parsed);
  } catch {
    return defaultRoomSettings;
  }
};

export const saveRoomSettings = (settings: RoomSettingsMap) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
