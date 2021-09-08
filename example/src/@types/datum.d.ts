import 'datum';

type MyCellData = {
    CSI: {
        div: number;
    },
    Quantity: {
        quantity: number;
    },
    UnitOfMeasure: {
        uom: number;
    }
};

declare module 'datum' {
    interface CustomTypes {
        CellData: MyCellData;
    }
}
