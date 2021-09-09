export enum UOM {
    SF='SF',
    ManHour='ManHour',
    Gallons='Gallons',
    Each='Each',
}

export const UOMString: Record<UOM, string> = {
    [UOM.SF]: 'SF',
    [UOM.ManHour]: 'Man hour',
    [UOM.Gallons]: 'Gallons',
    [UOM.Each]: 'Each',
};

export enum CSI {
    Div09='Div09',
    DoorsAndWindows='DoorsAndWindows',
    ThermalAndMoisture='ThermalAndMoisture',
    WoodAndPlastics='WoodAndPlastics',
}

export const CSIString: Record<CSI, string> = {
    [CSI.Div09]: 'DIV 09',
    [CSI.DoorsAndWindows]: 'DOORS & WINDOWS',
    [CSI.ThermalAndMoisture]: 'THERMAL & MOISTURE',
    [CSI.WoodAndPlastics]: 'WOOD & PLASTICS',
};

export const CSIColor: Record<CSI, string> = {
    [CSI.Div09]: '#3BB3F6',
    [CSI.DoorsAndWindows]: '#B76D2A',
    [CSI.ThermalAndMoisture]: '#35B72A',
    [CSI.WoodAndPlastics]: '#4F2AB7',
};
