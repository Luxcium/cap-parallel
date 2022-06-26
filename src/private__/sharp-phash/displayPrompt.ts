export const CSI = (Pt: string) => `\u009B${Pt}`;

export const CUD = (Ps: number) => CSI(`${Ps}B`);
export const CUU = (Ps: number) => CSI(`${Ps}A`);
export const SM = (Ps: number) => CSI(`${Ps}h`);
/** **Erase In Display:** Erase various parts of the viewport. */
export const ED = (Ps: number) => CSI(`${Ps}J`);
/**  **Erase In Display:** `0` Erase from the cursor through the end of the viewport. */
export const ED0 = ED(0);
/**  **Erase In Display:** `1` Erase from the beginning of the viewport through the cursor. */
export const ED1 = ED(1);
/**  **Erase In Display:** `2` Erase complete viewport. */
export const ED2 = ED(2);
/**  **Erase In Display:** `3` Erase scrollback. */
export const ED3 = ED(3);

/** 2	Keyboard Action Mode (KAM). Always on.	✗ */
export const SM2 = SM(2);
/** 4	Insert Mode (IRM).	✓ */
export const SM4 = SM(4);
/** 12	Send/receive (SRM). Always off.	✗ */
export const SM12 = SM(12);
/** 20	Automatic Newline (LNM). Always off.	✗ */
export const SM20 = SM(20);
export const RM = (Ps: number) => CSI(`${Ps}l`);
/**2	Keyboard Action Mode (KAM). Always on.	✗   */
export const RM2 = RM(2);
/** 4	Replace Mode (IRM). (default)	✓   */
export const RM4 = RM(4);
/** 12	Send/receive (SRM). Always off.	✗   */
export const RM12 = RM(12);
/** 20	Normal Linefeed (LNM). Always off.	✗   */
export const RM20 = RM(20);
export const DECSET = (Ps: string) => CSI(`?${Ps}h`);
export const DECRST = (Ps: string) => CSI(`?${Ps}l`);
