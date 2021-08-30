export interface Hello {
    something: string;
}

export const testExport: Hello = {
    something: 'tester',
};

export const blah = (something: string): Hello => {
    return  {
        something,
    };
};
