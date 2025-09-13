export type GetActionResult<T = undefined> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };
