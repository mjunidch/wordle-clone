export class GlobalConstants {
  public static TILE_COUNT = 5;
  public static GUESS_COUNT = 6;

  public static DISABLE_ANIMATION = false;

  public static SHARE_POPUP_DELAY = 1000;

  public static TEMP_DATE = new Date(2000, 1, 1);

  public static AnimationDuration = {
    SHAKE: 600,
    BOUNCE: 1000,
    POP_IN: 100,
    FLIP_IN: 250,
    FLIP_OUT: 250,
  };

  //Disable Animation
  // public static AnimationDuration = {
  //   SHAKE: 0,
  //   BOUNCE: 0,
  //   POP_IN: 0,
  //   FLIP_IN: 0,
  //   FLIP_OUT: 0,
  // };
}

export class MessageConstants {
  WIN_MESSAGE = [
    'Genius',
    'Magnificent',
    'Impressive',
    'Splendid',
    'Great',
    'Phew',
  ];
}
